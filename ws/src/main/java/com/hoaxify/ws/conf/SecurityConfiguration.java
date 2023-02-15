package com.hoaxify.ws.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.ArrayList;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private final UserAuthService authService;
    private final DelegatedAuthenticationEntryPoint delegatedAuthenticationEntryPoint;

    @Autowired
    public SecurityConfiguration(UserAuthService authService, DelegatedAuthenticationEntryPoint delegatedAuthenticationEntryPoint) {
        this.authService = authService;
        this.delegatedAuthenticationEntryPoint = delegatedAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();
//        http.cors().disable();
        String [] permittedUrlsToGet = {"/**"};
        http.httpBasic().authenticationEntryPoint(delegatedAuthenticationEntryPoint).and().exceptionHandling();
        http.authorizeHttpRequests()
//                .anyRequest().permitAll();
                .requestMatchers(HttpMethod.GET, permittedUrlsToGet).permitAll()
                .and()
                .authorizeHttpRequests().anyRequest().authenticated();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService);
    }
}