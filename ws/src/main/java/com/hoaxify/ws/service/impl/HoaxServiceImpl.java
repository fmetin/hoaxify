package com.hoaxify.ws.service.impl;

import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import com.hoaxify.ws.mapper.HoaxMapper;
import com.hoaxify.ws.repository.HoaxRepository;
import com.hoaxify.ws.service.HoaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HoaxServiceImpl implements HoaxService {
    private final HoaxRepository hoaxRepository;
    private final HoaxMapper hoaxMapper;

    @Autowired
    public HoaxServiceImpl(HoaxRepository hoaxRepository, HoaxMapper hoaxMapper) {
        this.hoaxRepository = hoaxRepository;
        this.hoaxMapper = hoaxMapper;
    }

    @Override
    public void save(HoaxRequestDto requestDto) {
        hoaxRepository.save(hoaxMapper.mapPostHoaxRequestDtoToHoax(requestDto));
    }

    @Override
    public Page<HoaxResponseDto> getHoaxes(Pageable pageable) {
        return hoaxRepository.findAll(pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }
}
