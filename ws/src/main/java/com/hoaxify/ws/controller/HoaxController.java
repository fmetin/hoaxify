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
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/v1/hoaxes/old/{id}")
    public ResponseEntity<?> getOldHoaxes(
            @PathVariable long id,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.getOldHoaxes(id, pageable)));
    }

    @GetMapping("/v1/hoaxes/new/{id}")
    public ResponseEntity<?> getNewHoaxes(
            @PathVariable long id,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.getNewHoaxes(id, pageable)));
    }

    @GetMapping("/v1/hoaxes/count/{id}")
    public ResponseEntity<?> getHoaxesCount(@PathVariable long id) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.getHoaxesCount(id)));
    }

    @GetMapping("/v1/hoaxes/user/{username}")
    public ResponseEntity<?> userHoaxes(
            @PathVariable String username,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.userHoaxes(username, pageable)));
    }

    @GetMapping("/v1/hoaxes/user/old/{username}/{id}")
    public ResponseEntity<?> oldHoaxesOfUser(
            @PathVariable String username,
            @PathVariable long id,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.oldHoaxesOfUser(username, id, pageable)));
    }

    @GetMapping("/v1/hoaxes/user/new/{username}/{id}")
    public ResponseEntity<?> newHoaxesOfUser(
            @PathVariable String username,
            @PathVariable long id,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.newHoaxesOfUser(username, id, pageable)));
    }

    @GetMapping("/v1/hoaxes/count/{id}/{username}")
    public ResponseEntity<?> getHoaxesCountOfUser(@PathVariable long id, @PathVariable String username) {
        return ResponseEntity.ok(new RestResponse<>(hoaxService.getHoaxesCountOfUser(id, username)));
    }
}
