package com.thegreatestteam.backend.model;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Image")
public class Image {
    private String id;
    private Binary image = null;

    public Image(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }
}
