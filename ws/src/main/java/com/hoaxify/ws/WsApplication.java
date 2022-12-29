package com.hoaxify.ws;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class WsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WsApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return args -> {
            CreateUserRequestDto requestDto = new CreateUserRequestDto();
            requestDto.setUsername("user1");
            requestDto.setDisplayName("display1");
            requestDto.setPassword("P4ssword");
            userService.createUser(requestDto);
        };
    }

}
