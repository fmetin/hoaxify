package com.hoaxify.ws.dto;

import com.hoaxify.ws.annotation.UniqueUserName;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.hoaxify.ws.shared.HoaxifyMessages.*;

@Data
public class CreateUserRequestDto {

    @NotNull(message = MSG_VALIDATION_CONSTRAINT_USERNAME_NOTNULL)
    @Size(min = 4, max = 255, message = MSG_VALIDATION_CONSTRAINT_USERNAME_SIZE)
    @UniqueUserName
    private String username;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL)
    private String displayName;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_PASSWORD_NOTNULL)
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = MSG_VALIDATION_CONSTRAINT_PASSWORD_PATTERN)
    private String password;
}
