package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.CreateUserRequestDto;

public interface UserService {

    void createUser(CreateUserRequestDto requestDto);
}
