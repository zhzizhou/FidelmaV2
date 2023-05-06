package com.thegreatestteam.backend.service;

import com.thegreatestteam.backend.model.Food;
import com.thegreatestteam.backend.model.Ingredient;
import com.thegreatestteam.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FoodService {
    @Autowired
    private final FoodRepository foodRepository;
    @Autowired
    private final IngredientService ingredientService;

    public FoodService(IngredientService ingredientService, FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
        this.ingredientService = ingredientService;
    }

    /**
     * Checks the availability of the dish
     * @param food
     * @return true if the ingredients run out
     *         false if the dish have enough ingredient
     * @since 1.0
     */
    public boolean checkAvailability(Food food){
        for(String ingredientName: food.getComponents().keySet()){
            Ingredient ingredient = ingredientService.findIngredientByName(ingredientName);
            if(ingredient == null){
                return false;
            }
            Double currentQuantity = ingredient.getQuantity();
            Double requiredQuantity = food.getComponents().get(ingredientName);
            if (requiredQuantity == null){
                requiredQuantity = 0.0;
            }
            if(currentQuantity - requiredQuantity < 0 ){
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the dishes contain an ingredient that is not in the database
     * @param food
     * @return true if one of the ingredient doesn't exist in the database
     *         false if all ingredients exist in the database
     * @since 1.0
     */
    public boolean checkCrash(Food food){
        for(String ingredientName: food.getComponents().keySet()){
            if(ingredientService.findIngredientByName(ingredientName) == null){
                return true;
            }
        }
        return false;
    }

    /**
     * Get all the food with the same type
     * if any food doesn't have enough ingredients set it state to sold out
     * if any food contains ingredients that are not in the database set it state to crash
     * @param type
     * @return all foods with the same type
     * @since 1.0
     */
    public List<Food> getFood(String type){
        List<Food> foods = foodRepository.findByType(type);
        for (Food food : foods){
            food.setSoldOut(checkAvailability(food));
            food.setCrash(checkCrash(food));
        }
        return foods;
    }

    /**
     * Add food to the database
     * @param food
     * @since 1.0
     */
    public void addFood(Food food){
        foodRepository.save(food);
    }

    /**
     * get food by its id
     * @param id
     * @return the selected food
     * @since 1.0
     */
    public Food getFoodById(String id){
        return foodRepository.findFoodById(id);
    }

    /**
     * get all ingredient
     * @return List of all ingredient
     * @since 1.0
     */
    public List<Ingredient> getAllIngredient(){
        return ingredientService.getAllIngredient();
    }

    /**
     * Delete the selected food
     * @param id
     * @since 1.0
     */
    public void deleteFood(String id){
        foodRepository.deleteFoodById(id);
    }

    /**
     * Check if the selected food exist
     * @param id
     * @return true if it exists, false if it doesn't exist
     * @since 1.0
     */
    public boolean checkFood(String id){
        return foodRepository.existsById(id);
    }

    /**
     *
     * @param food
     * @return
     * @since 1.0
     */
    public Integer computeFoodQuantity(Food food){
        Integer min = Integer.MAX_VALUE;
        for(Map.Entry<String, Double> pair : food.getComponents().entrySet()){
            if(ingredientService.findIngredientByName(pair.getKey()) == null){
                continue;
            }
            Double stock= ingredientService.findIngredientByName(pair.getKey()).getQuantity();
            Double required = pair.getValue();
            Double number = stock/required;
            Integer quan =  (int) Math.floor(number);
            if (quan < min){
                min = quan;
            }
        }
        return min;
    }
}
