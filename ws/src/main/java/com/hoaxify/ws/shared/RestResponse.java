package com.hoaxify.ws.shared;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class RestResponse<T> {
    private RestResponseHeader header;

    private T detail;

    private Map<String, String> validationErrors = new HashMap<>();

    public RestResponse(RestResponseHeader header, T detail, Map<String, String> validationErrors) {
        this.header = header;
        this.detail = detail;
        this.validationErrors = validationErrors;
    }

    public RestResponse() {
        this.header = new RestResponseHeader();
    }
}
