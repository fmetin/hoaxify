package com.hoaxify.ws.shared;

import static com.hoaxify.ws.shared.HoaxifyMessages.*;

public class HoaxifyResponseCodes {
    public static RestException VALIDATION_ERROR = new RestException("VLD-0001", MSG_VALIDATION_ERROR);
    public static RestException BAD_CREDENTIAL = new RestException("AUTH-0001", MSG_BAD_CREDENTIAL);
}
