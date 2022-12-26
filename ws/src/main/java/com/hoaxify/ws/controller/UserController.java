package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void createUser(@RequestBody CreateUserRequestDto request) {
        userService.createUser(request);
    }
}
