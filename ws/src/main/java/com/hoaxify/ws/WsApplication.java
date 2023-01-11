package com.hoaxify.ws;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WsApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return args -> {
            for (int i = 1; i < 10; i++) {
                CreateUserRequestDto requestDto = new CreateUserRequestDto();
                requestDto.setUsername("user" + i);
                requestDto.setDisplayName("display" + i);
                requestDto.setPassword("P4ssword");
                userService.createUser(requestDto);
            }

        };
    }

}
