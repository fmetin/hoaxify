package com.hoaxify.ws.mapper;

import com.hoaxify.ws.dto.HoaxAttachmentResponseDto;
import com.hoaxify.ws.entity.FileAttachment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {HoaxMapper.class})
public abstract class FileAttachmentMapper {

    public abstract HoaxAttachmentResponseDto mapFileAttachmentToHoaxAttachmentResponseDto(FileAttachment fileAttachment);
}
