package com.hoaxify.ws.dto;

import com.hoaxify.ws.annotation.UniqueUserName;
import com.hoaxify.ws.rc.HoaxifyResponseCodes;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequestDto {

    @NotNull
    @Size(min = 4, max = 255)
    private String username;
    @NotNull
    private String displayName;
    @NotNull
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;
}
