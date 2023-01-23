package com.hoaxify.ws.mapper;

import com.hoaxify.ws.annotation.TimestampMapping;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class LocalDateTimeMapper {


    @TimestampMapping
    public long mapToTimestamp(LocalDateTime value) {
        return Timestamp.valueOf(value).getTime();
    }
}