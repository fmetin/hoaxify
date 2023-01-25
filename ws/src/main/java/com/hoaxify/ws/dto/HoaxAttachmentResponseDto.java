package com.hoaxify.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class HoaxAttachmentResponseDto {
    private long id;
    private String name;
    private LocalDateTime createdDate;
    private HoaxResponseDto hoax;
}
