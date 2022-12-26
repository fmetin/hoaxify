package com.hoaxify.ws.dto;

import lombok.Data;

@Data
public class CreateUserRequestDto {

    private String username;
    private String displayName;
    private String password;
}
