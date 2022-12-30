package com.hoaxify.ws.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDto {

    private String username;
    private String displayName;
    private String image;
}
