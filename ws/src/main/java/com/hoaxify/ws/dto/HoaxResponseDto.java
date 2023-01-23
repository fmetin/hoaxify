package com.hoaxify.ws.dto;

import lombok.Data;

@Data
public class HoaxResponseDto {
    private Long id;
    private String content;
    private long createdDate;
    private UserResponseDto user;

}
