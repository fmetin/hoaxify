package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.UpdateUserRequestDto;
import com.hoaxify.ws.dto.UserResponseDto;
import com.hoaxify.ws.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    User createUser(CreateUserRequestDto requestDto);

    long countByUsername(String username);

    User findByUsername(String username);

    Page<UserResponseDto> getUsers(Pageable pageable, User user);

    UserResponseDto getUser(String username);

    UserResponseDto updateUser(UpdateUserRequestDto request, String username);

    void deleteUser(String username);
}
