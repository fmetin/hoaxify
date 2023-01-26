package com.hoaxify.ws.mapper;

import com.hoaxify.ws.annotation.TimestampMapping;
import com.hoaxify.ws.dto.HoaxRequestDto;
import com.hoaxify.ws.dto.HoaxResponseDto;
import com.hoaxify.ws.entity.Hoax;
import com.hoaxify.ws.util.LocalDateTimeUtil;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
        componentModel = "spring",
        uses = {UserMapper.class,
                FileAttachmentMapper.class,
                LocalDateTimeMapper.class
        })
public abstract class HoaxMapper {

    @Autowired
    protected LocalDateTimeUtil localDateTimeUtil;

    @Mapping(target = "createdDate", expression = "java(localDateTimeUtil.now())")
    public abstract Hoax mapPostHoaxRequestDtoToHoax(HoaxRequestDto requestDto);

    @Mapping(target = "createdDate", qualifiedBy = TimestampMapping.class)
    public abstract HoaxResponseDto mapHoaxToHoaxResponseDto(Hoax hoax);
}
