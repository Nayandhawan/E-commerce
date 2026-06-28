package com.stack.ecom.services.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageStorageService {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            "jpg", "jpeg", "png", "webp", "gif", "avif", "svg", "bmp", "tiff", "tif", "ico"
    );
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif",
            "image/avif", "image/svg+xml", "image/bmp", "image/tiff", "image/x-icon", "image/vnd.microsoft.icon"
    );
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    public String save(MultipartFile file, String type) throws IOException {
        validateImageFile(file);
        String ext = getExtension(file.getOriginalFilename());
        return writeBytes(file.getBytes(), type, ext);
    }

    public String save(byte[] data, String type, String filename) throws IOException {
        String ext = getExtension(filename);
        if (!ALLOWED_EXTENSIONS.contains(ext)) {
            throw new IllegalArgumentException("File type not allowed: " + ext);
        }
        return writeBytes(data, type, ext);
    }

    private void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds the 5 MB limit");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Only image files (JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, ICO) are allowed");
        }
        String ext = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(ext)) {
            throw new IllegalArgumentException("File extension not allowed: " + ext);
        }
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
