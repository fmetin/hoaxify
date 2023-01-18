package com.hoaxify.ws;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.entity.Hoax;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class WsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WsApplication.class, args);
    }

    @Bean
    @Profile("dev")
    CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) {
        return args -> {
            for (int i = 1; i < 25; i++) {
                CreateUserRequestDto requestDto = new CreateUserRequestDto();
                requestDto.setUsername("user" + i);
                requestDto.setDisplayName("display" + i);
                requestDto.setPassword("P4ssword");
                userService.createUser(requestDto);
            }

            for (int i = 1; i <= 50; i++) {
                HoaxRequestDto hoax = new HoaxRequestDto();
                hoax.setContent("hoax" + i);
                hoaxService.save(hoax);
            }

        };
    }

}
