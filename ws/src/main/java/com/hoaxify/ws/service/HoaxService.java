package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HoaxService {

    void save(HoaxRequestDto requestDto);

    Page<HoaxResponseDto> getHoaxes(Pageable pageable);
}
