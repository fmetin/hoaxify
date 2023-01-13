package com.hoaxify.ws.error;

import com.hoaxify.ws.shared.RestResponseCode;

import static com.hoaxify.ws.error.HoaxifyResponseMessage.*;


public class HoaxifyResponseCode extends RestResponseCode {

    public static HoaxifyResponseCode USER_NOT_FOUND = new HoaxifyResponseCode("HXY-0001", MSG_USER_NOT_FOUND);

    public HoaxifyResponseCode(String responseCode, String responseMessage) {
        super(responseCode, responseMessage);
    }


}
