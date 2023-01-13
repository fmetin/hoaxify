package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.UserResponseDto;
import com.hoaxify.ws.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    void createUser(CreateUserRequestDto requestDto);

    long countByUsername(String username);

    User findByUsername(String username);

    Page<UserResponseDto> getUsers(Pageable pageable, User user);

    UserResponseDto getUser(String username);
}
