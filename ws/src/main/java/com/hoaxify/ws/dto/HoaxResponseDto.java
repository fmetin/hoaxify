package com.hoaxify.ws.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HoaxResponseDto {
    private Long id;
    private String content;
    private LocalDateTime createdDate;

    private UserResponseDto user;
//    private String username;
//    private String displayName;
//    private String image;

}
