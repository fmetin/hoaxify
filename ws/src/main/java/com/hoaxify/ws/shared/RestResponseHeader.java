package com.hoaxify.ws.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RestResponseHeader {
    private String responseCode;
    private String responseMessage;

    public RestResponseHeader() {
        this.responseCode = "0";
        this.responseMessage= "Success";
    }
}
