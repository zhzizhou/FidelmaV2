package com.thegreatestteam.backend.service;

import com.thegreatestteam.backend.model.Ingredient;
import com.thegreatestteam.backend.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    /**
     * get all ingredient from the database
     * @return List of all ingredients
     * @since 1.0
     */
    public List<Ingredient> getAllIngredient(){
        return ingredientRepository.findAll();
    }

    /**
     * add ingredient to the database
     * @param ingredient
     * @since 1.0
     */
    public void addIngredient(Ingredient ingredient){
        ingredientRepository.save(ingredient);
    }

    /**
     * delete the selected ingredient from the database
     * @param id
     * @since 1.0
     */
    public void deleteIngredientById(String id){
        ingredientRepository.deleteById(id);
    }

    /**
     * find Ingredient by its name
     * @param name
     * @return ingredient with the same name
     * @since 1.0
     */
    public Ingredient findIngredientByName(String name){
        return ingredientRepository.findByName(name);
    }

    /**
     * find Ingredient by its id
     * @param id
     * @return ingredient with the same id
     * @since 1.0
     */
    public Ingredient findIngredientById(String id){
        return ingredientRepository.findIngredientById(id);
    }
}
