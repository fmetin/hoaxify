package com.hoaxify.ws.controller;

import com.hoaxify.ws.annotation.CurrentUser;
import com.hoaxify.ws.conf.HoaxifyUserDetails;
import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.shared.RestResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> hoaxes(@Valid @RequestBody HoaxRequestDto requestDto, @CurrentUser HoaxifyUserDetails hoaxifyUserDetails) {
        hoaxService.save(requestDto, hoaxifyUserDetails.getUser());
        return ResponseEntity.ok(new RestResponse<>());
    }

    @GetMapping("/v1/hoaxes")
    public ResponseEntity<?> getHoaxes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.getHoaxes(pageable)));
    }
}
