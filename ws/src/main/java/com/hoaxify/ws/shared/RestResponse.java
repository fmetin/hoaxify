package com.hoaxify.ws.shared;

import lombok.Data;

@Data
public class RestResponse<T> {
    private RestResponseHeader header;

    private T detail;

    public RestResponse() {
        this.header = new RestResponseHeader();
    }

    public RestResponse(T detail) {
        this.detail = detail;
        this.header = new RestResponseHeader();
    }

    public RestResponse(RestResponseHeader header, T detail) {
        this.header = header;
        this.detail = detail;
    }
}
