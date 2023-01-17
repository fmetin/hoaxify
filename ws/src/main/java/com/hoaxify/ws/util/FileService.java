package com.hoaxify.ws.util;

import com.hoaxify.ws.conf.AppConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Slf4j
public class FileService {


    private final AppConfiguration appConfiguration;
    private final Tika tika;

    @Autowired
    public FileService(AppConfiguration appConfiguration, Tika tika) {
        this.appConfiguration = appConfiguration;
        this.tika = tika;
    }

    public String writeBase64EncodedStringToFile(String image) {
        String fileName = generateRandomName();
        File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
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

    public void deleteFile(String oldImage) {
        if (oldImage == null)
            return;
        try {
            Files.deleteIfExists(Paths.get(appConfiguration.getUploadPath(), oldImage));
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
}
