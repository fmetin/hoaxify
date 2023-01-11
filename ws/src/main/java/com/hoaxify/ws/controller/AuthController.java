package com.hoaxify.ws.controller;

import com.hoaxify.ws.annotation.CurrentUser;
import com.hoaxify.ws.conf.HoaxifyUserDetails;
import com.hoaxify.ws.dto.AuthResponseDto;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.mapper.UserMapper;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final UserMapper userMapper;

    @Autowired
    public AuthController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @PostMapping("/v1/auth")
    ResponseEntity<?> auth(@CurrentUser HoaxifyUserDetails hoaxifyUserDetails) {
        User user = hoaxifyUserDetails.getUser();
        return ResponseEntity.ok(new RestResponse<>(
                new RestResponseHeader(),
                userMapper.mapUserToAuthResponseDto(user),
                null
        ));
    }
}
