package com.thegreatestteam.backend.repository;

import com.thegreatestteam.backend.model.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.awt.*;

public interface ImageRepository extends MongoRepository<Image,String> {
    Image getImageById(String id);
}
