package com.hoaxify.ws.shared;

import lombok.Data;

@Data
public class RestException extends Exception {

    private String responseCode;
    private String responseMessage;

    private String fieldName;
    public RestException(String responseCode, String responseMessage) {
        super(responseMessage);
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }
}
