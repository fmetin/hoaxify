package com.hoaxify.ws.dto;

import com.hoaxify.ws.annotation.ProfileImage;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.hoaxify.ws.shared.RestResponseMessage.*;

@Data
public class UpdateUserRequestDto {

    @NotNull(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL)
    @NotEmpty(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTEMPTY)
    @Size(min = 4, max = 255, message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_SIZE)
    private String displayName;
    @ProfileImage
    private String image;
}
