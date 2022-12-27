package com.hoaxify.ws.rc;

import com.hoaxify.ws.shared.RestException;

public class HoaxifyResponseCodes {
    public static RestException USERNAME_VALIDATION = new RestException("USR-0001", "Username is empty or invalid.");
    public static RestException DISPLAY_NAME_VALIDATION_ERROR = new RestException("USR-0002", "Display name is empty or invalid.");
}
