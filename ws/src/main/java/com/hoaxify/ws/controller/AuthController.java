package com.hoaxify.ws.controller;

import com.hoaxify.ws.annotation.CurrentUser;
import com.hoaxify.ws.conf.HoaxifyUserDetails;
import com.hoaxify.ws.dto.AuthResponseDto;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseHeader;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @PostMapping("/v1/auth")
    ResponseEntity<?> auth(@CurrentUser HoaxifyUserDetails hoaxifyUserDetails) {
        User user = hoaxifyUserDetails.getUser();
        return ResponseEntity.ok(new RestResponse<>(
                new RestResponseHeader(),
                AuthResponseDto.builder()
                        .image(user.getImage())
                        .displayName(user.getDisplayName())
                        .username(user.getUsername())
                        .build(),
                null
        ));
    }
}
