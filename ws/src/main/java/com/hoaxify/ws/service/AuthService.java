package com.hoaxify.ws.service;

import javax.naming.AuthenticationException;

public interface AuthService {

    void auth(String authorization) throws AuthenticationException;
}
