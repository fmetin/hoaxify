package com.hoaxify.ws.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HoaxCountResponseDto {
    private long count;
}
