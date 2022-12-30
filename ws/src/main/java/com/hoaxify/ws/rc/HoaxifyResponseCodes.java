package com.hoaxify.ws.rc;

import com.hoaxify.ws.shared.RestException;

import static com.hoaxify.ws.rc.HoaxifyMessages.*;

public class HoaxifyResponseCodes {
    public static RestException VALIDATION_ERROR = new RestException("VLD-0001", "{hoaxify.validation.error}");
    public static RestException BAD_CREDENTIAL = new RestException("AUTH-0001", "{hoaxify.bad.credential}");
    public static RestException VALIDATION_CONSTRAINT_USERNAME_NOTNULL_ERROR = new RestException("USR-0001", VALIDATION_CONSTRAINT_USERNAME_NOTNULL);
    public static RestException VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL_ERROR = new RestException("USR-0002", VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL);
    public static RestException VALIDATION_CONSTRAINT_UNIQUEUSERNAME_ERROR = new RestException("USR-0003", VALIDATION_CONSTRAINT_UNIQUEUSERNAME);
}
