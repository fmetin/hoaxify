package com.hoaxify.ws.shared;

import com.hoaxify.ws.conf.Translator;
import lombok.AllArgsConstructor;
import lombok.Data;

import static com.hoaxify.ws.error.HoaxifyResponseMessage.MSG_BAD_CREDENTIAL;
import static com.hoaxify.ws.error.HoaxifyResponseMessage.MSG_VALIDATION_ERROR;
import static com.hoaxify.ws.shared.RestResponseMessage.MSG_FORBIDDEN_ERROR;

@Data
@AllArgsConstructor
public class RestResponseCode {

    private String responseCode;
    private String responseMessage;
    public static RestResponseCode BAD_CREDENTIAL = new RestResponseCode("GNL-0001", MSG_BAD_CREDENTIAL);
    public static RestResponseCode VALIDATION_ERROR = new RestResponseCode("GNL-0002", MSG_VALIDATION_ERROR);
    public static RestResponseCode FORBIDDEN_ERROR = new RestResponseCode("GNL-0003", MSG_FORBIDDEN_ERROR);

    public String getlocalizedResponseMessage() {
        return Translator.toLocale(responseMessage);
    }
}
