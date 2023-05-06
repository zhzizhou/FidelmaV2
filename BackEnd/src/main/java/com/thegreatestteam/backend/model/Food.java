package com.thegreatestteam.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("Food")
public class Food extends Item {
    private Map<String, Double> components;
    private String type;
    private byte[] image;
    private String id;
    private Boolean isSoldOut;
    private String description;
    private int kiloJoule;
    private boolean isCrash;

    public Food(String id, String name, double price , String type, int kiloJoule, Map<String, Double> components, String description){
        super(name, price);
        this.type = type;
        this.kiloJoule = kiloJoule;
        this.id = id;
        this.components = components;
        this.description = description;
        this.isSoldOut = false;
        this.isCrash = false;
    }

    public boolean isCrash() {
        return isCrash;
    }

    public void setCrash(boolean crash) {
        isCrash = crash;
    }

    public int getKiloJoule() {
        return kiloJoule;
    }

    public void setKiloJoule(int kiloJoule) {
        this.kiloJoule = kiloJoule;
    }

    public Map<String, Double> getComponents() {
        return components;
    }

    public void setComponents(Map<String, Double> components) {
        this.components = components;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getSoldOut() {
        return isSoldOut;
    }

    public void setSoldOut(Boolean soldOut) {
        isSoldOut = soldOut;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Food{" +
                "name="+ getName() +
                "price="+getPrice()+
                "components=" + components +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", kiloJoule=" + kiloJoule +
                '}';
    }
}

