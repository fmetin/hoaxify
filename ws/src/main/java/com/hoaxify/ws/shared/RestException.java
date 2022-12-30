package com.hoaxify.ws.shared;

import com.hoaxify.ws.conf.Translator;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;

@EqualsAndHashCode(callSuper = true)
@Data
@Slf4j
public class RestException extends Exception {
    private String responseCode;
    private String responseMessage;


    public RestException(String responseCode, String responseMessage) {
        super(responseMessage);
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    public String getResponseMessage() {
        return Translator.toLocale(responseMessage);
    }


}
