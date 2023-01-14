package com.hoaxify.ws.service.impl;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.UpdateUserRequestDto;
import com.hoaxify.ws.dto.UserResponseDto;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.mapper.UserMapper;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.hoaxify.ws.error.HoaxifyResponseCode.USER_NOT_FOUND;


@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public void createUser(CreateUserRequestDto requestDto) {
        User user = userMapper.mapUserToCreateUserRequestDto(requestDto);
        userRepository.save(user);
    }

    @Override
    public long countByUsername(String username) {
        return userRepository.countByUsername(username);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Page<UserResponseDto> getUsers(Pageable pageable, User user) {
        if (user != null)
            return userRepository.findByIdNot(user.getId(), pageable).map(userMapper::mapUserToUserResponseDto);
        return userRepository.findAll(pageable).map(userMapper::mapUserToUserResponseDto);
    }

    @Override
    public UserResponseDto getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new RestException(USER_NOT_FOUND);

        return userMapper.mapUserToUserResponseDto(user);
    }

    @Override
    public UserResponseDto updateUser(UpdateUserRequestDto request, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new RestException(USER_NOT_FOUND);
        user.setDisplayName(request.getDisplayName());
        userRepository.save(user);
        return userMapper.mapUserToUserResponseDto(user);
    }
}
