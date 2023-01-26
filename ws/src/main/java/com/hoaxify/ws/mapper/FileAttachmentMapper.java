package com.hoaxify.ws.mapper;

import com.hoaxify.ws.dto.FileAttachmentResponseDto;
import com.hoaxify.ws.entity.FileAttachment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class FileAttachmentMapper {

    public abstract FileAttachmentResponseDto mapFileAttachmentToHoaxAttachmentResponseDto(FileAttachment fileAttachment);
}
