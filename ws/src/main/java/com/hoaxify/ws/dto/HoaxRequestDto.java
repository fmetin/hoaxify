package com.hoaxify.ws.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class HoaxRequestDto {

    @NotNull
    @Size(min = 1, max = 1000)
    private String content;

    private long attachmentId;


}
