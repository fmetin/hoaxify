package com.hoaxify.ws.rc;

import com.hoaxify.ws.shared.RestException;

import static com.hoaxify.ws.rc.HoaxifyMessages.*;

public class HoaxifyResponseCodes {
    public static RestException VALIDATION_ERROR = new RestException("VLD-0001", MSG_VALIDATION_ERROR);
    public static RestException BAD_CREDENTIAL = new RestException("AUTH-0001", MSG_BAD_CREDENTIAL);
}
