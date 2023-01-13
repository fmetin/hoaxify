package com.hoaxify.ws.shared;

import com.hoaxify.ws.conf.Translator;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;

@EqualsAndHashCode(callSuper = true)
@Data
public class RestException extends RuntimeException {
    private String responseCode;
    private String responseMessage;


    public RestException(String responseCode, String responseMessage) {
        super(responseMessage);
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    public RestException(RestResponseCode restResponseCode) {
        super(restResponseCode.getResponseMessage());
        this.responseCode = restResponseCode.getResponseCode();
        this.responseMessage = restResponseCode.getResponseMessage();
    }

    public String getResponseMessage() {
        return Translator.toLocale(responseMessage);
    }


}
