package com.hoaxify.ws.controller;

import com.hoaxify.ws.annotation.CurrentUser;
import com.hoaxify.ws.conf.HoaxifyUserDetails;
import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.UpdateUserRequestDto;
import com.hoaxify.ws.error.HoaxifyResponseCode;
import com.hoaxify.ws.error.HoaxifyResponseMessage;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestException;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/v1/user/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        return ResponseEntity.ok(new RestResponse<>(userService.getUser(username)));
    }

    @PutMapping("/v1/user/{username}")
    @PreAuthorize("#username == principal.username")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequestDto request,
                                        @PathVariable String username) {
        return ResponseEntity.ok(new RestResponse<>(userService.updateUser(request, username)));
    }
}
