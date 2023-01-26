package com.hoaxify.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FileAttachmentResponseDto {
    private long id;
    private String name;
    private LocalDateTime createdDate;
}
