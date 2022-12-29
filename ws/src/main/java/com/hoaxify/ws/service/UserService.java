package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.entity.User;

public interface UserService {

    void createUser(CreateUserRequestDto requestDto);

    long countByUsername(String username);

    User findByUsername(String username);
}
