package com.thegreatestteam.backend.service;

import com.thegreatestteam.backend.model.Food;
import com.thegreatestteam.backend.model.Image;
import com.thegreatestteam.backend.repository.FoodRepository;
import com.thegreatestteam.backend.repository.ImageRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private FoodRepository foodRepository;

    /**
     * Critical adding image function, decoding and
     * storing image into the database
     * @param file actual image file,
     * @param id image id that is generated from the frontend
     * @throws IOException
     */

    public void addImage(MultipartFile file, String id) throws IOException {
        try {
            Image image = new Image(id);
            image.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            System.out.println(image.getImage().getData());
            imageRepository.save(image);
            Food food = foodRepository.findFoodById(id);
            food.setImage(image.getImage().getData());
            foodRepository.save(food);
        } catch (IOException e) {
            throw new IOException("Image upload unsuccessful");
        }
    }

    /**
     *
     * @param id image id
     * @return image
     * @throws Exception if the image retrival is unsuccessful
     */
    public Image getImageById(String id) throws Exception{
        try {
            Image image = imageRepository.getImageById(id);
            return image;
        }catch(Exception e){
            throw new Exception("Unsuccessful image retreive");
        }
    }

    public List<Image> getAllImage(){
        return imageRepository.findAll();
    }

    public void deleteImage(String id ){
        imageRepository.deleteById(id);
    }
}
