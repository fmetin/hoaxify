package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.AuthResponseDto;
import com.hoaxify.ws.service.AuthService;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(UserService userService, AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/v1/auth")
    ResponseEntity<?> auth(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null || authorization.isEmpty()) {
            RestResponse<Void> restResponse = new RestResponse<>(
                    new RestResponseHeader("401", "Unauthorized"),
                    null,
                    null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(restResponse);
        }

        try {
            return ResponseEntity.ok(new RestResponse<>(new RestResponseHeader(), authService.auth(authorization), null));
        } catch (Exception e) {
            RestResponse<Void> restResponse = new RestResponse<>(
                    new RestResponseHeader("401", "Unauthorized"),
                    null,
                    null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(restResponse);
        }
    }
}
