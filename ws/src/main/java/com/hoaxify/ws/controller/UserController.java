package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/v1/create-user")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        userService.createUser(request);
        return ResponseEntity.ok(new RestResponse<>());
    }


}
