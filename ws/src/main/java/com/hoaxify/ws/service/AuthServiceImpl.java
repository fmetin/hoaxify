package com.hoaxify.ws.service;

import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Base64;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserService userService) {
        this.userService = userService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void auth(String authorization) throws AuthenticationException {
        String base64encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64encoded));
        String[] parts = decoded.split(":");
        String username = parts[0];
        String password = parts[1];
        User user = userService.findByUsername(username);
        if (user == null)
            throw new AuthenticationException();


        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new AuthenticationException();
    }
}
