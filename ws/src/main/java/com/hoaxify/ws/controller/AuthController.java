package com.hoaxify.ws.controller;

import com.hoaxify.ws.shared.RestResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @PostMapping("/v1/auth")
    ResponseEntity<?> auth(@RequestHeader(name = "Authorization") String authorization) {
        return ResponseEntity.ok(new RestResponse<>());
    }
}
