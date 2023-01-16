package com.hoaxify.ws.mapper;

import com.hoaxify.ws.annotation.EncodedMapping;
import com.hoaxify.ws.dto.AuthResponseDto;
import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.UpdateUserRequestDto;
import com.hoaxify.ws.dto.UserResponseDto;
import com.hoaxify.ws.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PasswordEncoderMapper.class})
public interface UserMapper {
    @Mapping(target = "password", qualifiedBy = EncodedMapping.class)
    User mapUserToCreateUserRequestDto(CreateUserRequestDto requestDto);

    UserResponseDto mapUserToUserResponseDto(User user);

    AuthResponseDto mapUserToAuthResponseDto(User user);
}
