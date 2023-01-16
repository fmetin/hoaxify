package com.hoaxify.ws.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import static com.hoaxify.ws.shared.RestResponseMessage.MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTEMPTY;
import static com.hoaxify.ws.shared.RestResponseMessage.MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL;

@Data
public class UpdateUserRequestDto {

    @NotNull(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL)
    @NotEmpty(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTEMPTY)
    private String displayName;
    private String image;
}
