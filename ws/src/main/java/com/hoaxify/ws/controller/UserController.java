package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class UserController {

    @CrossOrigin
    @PostMapping("/v1/create-user")
    public void createUser(@RequestBody CreateUserRequestDto request){
        log.info(request.toString());
    }
}
