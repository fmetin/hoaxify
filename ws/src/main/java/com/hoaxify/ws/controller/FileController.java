package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.HoaxAttachmentResponseDto;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.util.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }


    @PostMapping("/v1/file/hoax-attachment")
    public ResponseEntity<?> saveAttachment(MultipartFile file) {
        return ResponseEntity.ok(new RestResponse<>(fileService.saveHoaxAttachment(file)));
    }
}
