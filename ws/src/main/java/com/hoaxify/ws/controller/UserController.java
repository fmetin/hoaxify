package com.hoaxify.ws.controller;

import com.hoaxify.ws.annotation.CurrentUser;
import com.hoaxify.ws.conf.HoaxifyUserDetails;
import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/v1/users")
    public ResponseEntity<?> getUsers(Pageable pageable, @CurrentUser HoaxifyUserDetails hoaxifyUserDetails) {
        return ResponseEntity.ok(new RestResponse<>(userService.getUsers(pageable, hoaxifyUserDetails != null ? hoaxifyUserDetails.getUser() : null)));
    }


}
