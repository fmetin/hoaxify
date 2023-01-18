package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.shared.RestResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HoaxController {

    private final HoaxService hoaxService;

    @Autowired
    public HoaxController(HoaxService hoaxService) {
        this.hoaxService = hoaxService;
    }

    @PostMapping("/v1/hoaxes")
    public ResponseEntity<?> hoaxes(@Valid @RequestBody HoaxRequestDto requestDto) {
        hoaxService.save(requestDto);
        return ResponseEntity.ok(new RestResponse<>());
    }
}
