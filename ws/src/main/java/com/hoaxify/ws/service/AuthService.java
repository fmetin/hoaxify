package com.hoaxify.ws.service;

import com.hoaxify.ws.dto.AuthResponseDto;

import javax.naming.AuthenticationException;

public interface AuthService {

    AuthResponseDto auth(String authorization) throws AuthenticationException;
}
