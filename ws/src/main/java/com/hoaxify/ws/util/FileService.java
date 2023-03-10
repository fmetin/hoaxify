package com.hoaxify.ws.util;

import com.hoaxify.ws.conf.AppConfiguration;
import com.hoaxify.ws.dto.FileAttachmentResponseDto;
import com.hoaxify.ws.entity.FileAttachment;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.mapper.FileAttachmentMapper;
import com.hoaxify.ws.repository.FileAttachmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@EnableScheduling
public class FileService {


    private final FileAttachmentRepository fileAttachmentRepository;

    private final FileAttachmentMapper fileAttachmentMapper;
    private final AppConfiguration appConfiguration;
    private final Tika tika;

    @Autowired
    public FileService(FileAttachmentRepository fileAttachmentRepository, FileAttachmentMapper fileAttachmentMapper, AppConfiguration appConfiguration, Tika tika) {
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.fileAttachmentMapper = fileAttachmentMapper;
        this.appConfiguration = appConfiguration;
        this.tika = tika;
    }

    public String writeBase64EncodedStringToFile(String image) {
        String fileName = generateRandomName();
        File target = new File(appConfiguration.getProfileStoragePath() + "/" + fileName);
        try {
            OutputStream outputStream = new FileOutputStream(target);
            byte[] base64Encoded = Base64.getDecoder().decode(image);
            outputStream.write(base64Encoded);
            outputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return fileName;
    }

    public String generateRandomName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void deleteProfileImage(String oldImage) {
        if (oldImage == null)
            return;
        deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImage));
    }
    public void deleteAttachmentFile(String file) {
        if (file == null)
            return;
        deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(), file));
    }

    private void deleteFile(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error(e.toString());
        }
    }

    public boolean isValidFileType(String file, String[] validFileTypes) {
        if (file == null || file.isEmpty())
            return true;
        String fileType = tika.detect(Base64.getDecoder().decode(file));
        log.info("File type {}", fileType);
        for (String validFileType :
                validFileTypes) {
            if (fileType.contains(validFileType))
                return true;
        }
        return false;
    }

    public FileAttachmentResponseDto saveHoaxAttachment(MultipartFile file) {
        String fileName = generateRandomName();
        File target = new File(appConfiguration.getAttachmentStoragePath() + "/" + fileName);
        String fileType;
        try {
            OutputStream outputStream = new FileOutputStream(target);
            outputStream.write(file.getBytes());
            outputStream.close();
            fileType = tika.detect(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        FileAttachment attachment = new FileAttachment();
        attachment.setName(fileName);
        attachment.setCreatedDate(LocalDateTime.now());
        attachment.setFileType(fileType);
        return fileAttachmentMapper.mapFileAttachmentToHoaxAttachmentResponseDto(fileAttachmentRepository.save(attachment));
    }

    @Scheduled(timeUnit = TimeUnit.MINUTES, fixedRate = 5)
    public void cleanupStorage(){
        List<FileAttachment> fileAttachmentList = fileAttachmentRepository.findByCreatedDateBeforeAndHoaxNull(LocalDateTime.now().minusMinutes(5));
        for (FileAttachment file :
                fileAttachmentList) {
            log.info("Removing file: " + file.getName());
            deleteAttachmentFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
        }
    }

    public void deleteAllStoredFilesForUser(User user) {
        deleteProfileImage(user.getImage());
        List<FileAttachment> filesToBeRemoved = fileAttachmentRepository.findByHoax_User(user);
        for (FileAttachment fileAttachment : filesToBeRemoved) {
            deleteAttachmentFile(fileAttachment.getName());
        }
        
    }
}
