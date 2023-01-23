package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.HoaxCountResponseDto;
import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import com.hoaxify.ws.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HoaxService {

    void save(HoaxRequestDto requestDto, User user);

    Page<HoaxResponseDto> getHoaxes(Pageable pageable);
    Page<HoaxResponseDto> userHoaxes(String username, Pageable pageable);

    Page<HoaxResponseDto> getOldHoaxes(long id, Pageable pageable);

    Page<HoaxResponseDto> oldHoaxesOfUser(String username, long id, Pageable pageable);

    HoaxCountResponseDto getHoaxesCount(long id);

    HoaxCountResponseDto getHoaxesCountOfUser(long id, String username);
}
