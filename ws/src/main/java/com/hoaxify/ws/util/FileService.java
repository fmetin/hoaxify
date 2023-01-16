package com.hoaxify.ws.util;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {

    public String writeBase64EncodedStringToFile(String image) {
        String fileName = generateRandomName();
        File target = new File("picture-storage/" + fileName);
        try {
            OutputStream outputStream = new FileOutputStream(target);
            byte[] base64Encoded = Base64.getDecoder().decode(image);
            outputStream.write(base64Encoded);
            outputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return fileName;
    }

    public String generateRandomName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
