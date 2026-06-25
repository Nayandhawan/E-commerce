package com.stack.ecom.services.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageStorageService {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    public String save(MultipartFile file, String type) throws IOException {
        String ext = getExtension(file.getOriginalFilename());
        return writeBytes(file.getBytes(), type, ext);
    }

    public String save(byte[] data, String type, String filename) throws IOException {
        String ext = getExtension(filename);
        return writeBytes(data, type, ext);
    }

    private String writeBytes(byte[] data, String type, String ext) throws IOException {
        Path dir = Paths.get(uploadDir, type);
        Files.createDirectories(dir);
        String filename = UUID.randomUUID() + "." + ext;
        Files.write(dir.resolve(filename), data);
        return "/api/images/" + type + "/" + filename;
    }

    public byte[] load(String type, String filename) throws IOException {
        Path file = Paths.get(uploadDir, type, filename);
        return Files.readAllBytes(file);
    }

    private String getExtension(String name) {
        if (name != null && name.contains(".")) {
            return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
        }
        return "jpg";
    }
}
