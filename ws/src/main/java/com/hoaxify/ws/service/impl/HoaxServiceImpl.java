package com.hoaxify.ws.service.impl;

import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import com.hoaxify.ws.entity.Hoax;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.error.HoaxifyResponseCode;
import com.hoaxify.ws.mapper.HoaxMapper;
import com.hoaxify.ws.repository.HoaxRepository;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class HoaxServiceImpl implements HoaxService {
    private final HoaxRepository hoaxRepository;
    private final HoaxMapper hoaxMapper;

    private final UserService userService;

    @Autowired
    public HoaxServiceImpl(HoaxRepository hoaxRepository, HoaxMapper hoaxMapper, UserService userService) {
        this.hoaxRepository = hoaxRepository;
        this.hoaxMapper = hoaxMapper;
        this.userService = userService;
    }

    @Override
    public void save(HoaxRequestDto requestDto, User user) {
        Hoax hoax = hoaxMapper.mapPostHoaxRequestDtoToHoax(requestDto);
        hoax.setUser(user);
        hoaxRepository.save(hoax);
    }

    @Override
    public Page<HoaxResponseDto> getHoaxes(Pageable pageable) {
        return hoaxRepository.findAll(pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> userHoaxes(String username, Pageable pageable) {
        userService.getUser(username);
        return hoaxRepository.findByUser_Username(username, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> getOldHoaxes(long id, Pageable pageable) {
        return hoaxRepository.findByIdLessThan(id, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> oldHoaxesOfUser(String username, long id, Pageable pageable) {
        userService.getUser(username);
        return hoaxRepository.findByIdLessThanAndUser_Username(id, username, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }
}
