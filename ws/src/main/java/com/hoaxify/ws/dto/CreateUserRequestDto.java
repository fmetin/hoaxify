package com.hoaxify.ws.dto;

import com.hoaxify.ws.annotation.UniqueUserName;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.hoaxify.ws.error.HoaxifyResponseMessage.*;

@Data
public class CreateUserRequestDto {

    @NotNull(message = MSG_VALIDATION_CONSTRAINT_USERNAME_NOTNULL)
    @Size(min = 4, max = 255, message = MSG_VALIDATION_CONSTRAINT_USERNAME_SIZE)
    @UniqueUserName
    private String username;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL)
    @NotEmpty(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTEMPTY)
    private String displayName;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_PASSWORD_NOTNULL)
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = MSG_VALIDATION_CONSTRAINT_PASSWORD_PATTERN)
    private String password;
}
