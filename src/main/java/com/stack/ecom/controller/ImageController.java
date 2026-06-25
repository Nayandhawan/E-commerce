package com.stack.ecom.controller;

import com.stack.ecom.services.storage.ImageStorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageStorageService imageStorageService;

    public ImageController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @GetMapping("/{type}/{filename}")
    public ResponseEntity<byte[]> serveImage(@PathVariable String type, @PathVariable String filename) {
        try {
            byte[] data = imageStorageService.load(type, filename);
            String mediaType = filename.endsWith(".png") ? "image/png" : "image/jpeg";
            return ResponseEntity.ok()
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=31536000, immutable")
                    .contentType(MediaType.parseMediaType(mediaType))
                    .body(data);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
