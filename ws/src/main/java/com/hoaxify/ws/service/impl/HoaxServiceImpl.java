package com.hoaxify.ws.service.impl;

import com.hoaxify.ws.dto.HoaxCountResponseDto;
import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import com.hoaxify.ws.entity.FileAttachment;
import com.hoaxify.ws.entity.Hoax;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.mapper.HoaxMapper;
import com.hoaxify.ws.repository.FileAttachmentRepository;
import com.hoaxify.ws.repository.HoaxRepository;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.util.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HoaxServiceImpl implements HoaxService {
    private final HoaxRepository hoaxRepository;
    private final HoaxMapper hoaxMapper;
    private final UserService userService;
    private final FileAttachmentRepository fileAttachmentRepository;
    private final FileService fileService;

    @Autowired
    public HoaxServiceImpl(HoaxRepository hoaxRepository, HoaxMapper hoaxMapper, @Lazy UserService userService, FileAttachmentRepository fileAttachmentRepository, FileService fileService) {
        this.hoaxRepository = hoaxRepository;
        this.hoaxMapper = hoaxMapper;
        this.userService = userService;
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.fileService = fileService;
    }

    @Override
    public void save(HoaxRequestDto requestDto, User user) {
        Hoax hoax = hoaxMapper.mapPostHoaxRequestDtoToHoax(requestDto);
        hoax.setUser(user);
        hoaxRepository.save(hoax);
        Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(requestDto.getAttachmentId());
        if (optionalFileAttachment.isPresent()) {
            FileAttachment fileAttachment = optionalFileAttachment.get();
            fileAttachment.setHoax(hoax);
            fileAttachmentRepository.save(fileAttachment);
        }
    }

    @Override
    public Page<HoaxResponseDto> getHoaxes(Pageable pageable) {
        return hoaxRepository.findAll(pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> userHoaxes(String username, Pageable pageable) {
        userService.getUser(username);
        return hoaxRepository.findByUser_Username(username, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> getOldHoaxes(long id, Pageable pageable) {
        Specification<Hoax> spec = idLessThan(id);
        return hoaxRepository.findAll(spec, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public Page<HoaxResponseDto> oldHoaxesOfUser(String username, long id, Pageable pageable) {
        userService.getUser(username);
        Specification<Hoax> spec = idLessThan(id).and(userIs(username));
        return hoaxRepository.findAll(spec, pageable).map(hoaxMapper::mapHoaxToHoaxResponseDto);
    }

    @Override
    public HoaxCountResponseDto getHoaxesCount(long id) {
        Specification<Hoax> spec = idGreaterThan(id);
        return HoaxCountResponseDto.builder().count(hoaxRepository.count(spec)).build();
    }

    @Override
    public HoaxCountResponseDto getHoaxesCountOfUser(long id, String username) {
        Specification<Hoax> spec = idGreaterThan(id).and(userIs(username));
        return HoaxCountResponseDto.builder().count(hoaxRepository.count(spec)).build();
    }

    @Override
    public List<HoaxResponseDto> getNewHoaxes(long id, Pageable pageable) {
        Specification<Hoax> spec = idGreaterThan(id);
        return hoaxRepository.findAll(spec, pageable).stream().map(hoaxMapper::mapHoaxToHoaxResponseDto).collect(Collectors.toList());
    }

    @Override
    public List<HoaxResponseDto> newHoaxesOfUser(String username, long id, Pageable pageable) {
        Specification<Hoax> spec = idGreaterThan(id).and(userIs(username));
        return hoaxRepository.findAll(spec, pageable.getSort()).stream().map(hoaxMapper::mapHoaxToHoaxResponseDto).collect(Collectors.toList());
    }

    @Override
    public void delete(long id) {
        Hoax hoax = hoaxRepository.getReferenceById(id);
        if (hoax.getFileAttachment() != null)
            fileService.deleteAttachmentFile(hoax.getFileAttachment().getName());
        hoaxRepository.deleteById(id);
    }

    @Override
    public void deleteHoaxesOfUser(String username) {
        Specification<Hoax> spec = userIs(username);
        List<Hoax> hoaxList = hoaxRepository.findAll(spec);
        hoaxRepository.deleteAll(hoaxList);
    }

    Specification<Hoax> idGreaterThan(long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"), id);
    }

    Specification<Hoax> idLessThan(long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"), id);
    }

    Specification<Hoax> userIs(String username) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user").get("username"), username);
    }

}
