package com.thegreatestteam.backend.controller;

import com.thegreatestteam.backend.model.Ingredient;
import com.thegreatestteam.backend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"${frontend.host.heroku}", "${frontend.host.local}", "${frontend.host.heroku2}"})
@RestController
@RequestMapping("/staff")
public class IngredientController {
    private final IngredientService ingredientService;


    @Autowired
    public IngredientController(IngredientService ingredientService){
        this.ingredientService = ingredientService;
    }

    /**
     * get all ingredients
     * @return all ingredient
     * @since 1.0
     * @throws NullPointerException if ingredientService.getAllIngredient() return null
     */
    @GetMapping("/ingredient")
    @ResponseStatus(HttpStatus.OK)
    public List<Ingredient> getIngredient(){
        return ingredientService.getAllIngredient();
    }

    /**
     * get ingredients by it's id
     * @param ingredientId
     * @return ingredient with the same id
     * @since 1.0
     * @throws NullPointerException if ingredientService.findIngredientById(ingredientId) return null
     */
    @GetMapping("/ingredient/{ingredientId}")
    @ResponseStatus(HttpStatus.OK)
    public Ingredient getIngredientById(@PathVariable String ingredientId){
        return ingredientService.findIngredientById(ingredientId);
    }

    /**
     * POST method to add new ingredient
     * @param ingredient
     * @return ingredient just added
     * @since 1.0
     */
    @PostMapping("/ingredient")
    @ResponseStatus(HttpStatus.CREATED)
    public Ingredient addIngredient(@RequestBody Ingredient ingredient){
        ingredientService.addIngredient(ingredient);
        return ingredient;
    }

    /**
     * Delete method to delete the selected ingredient
     * @param ingredientId
     * @since 1.0
     */
    @DeleteMapping("/ingredient/{ingredientId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteIngredient(@PathVariable String ingredientId){
        ingredientService.deleteIngredientById(ingredientId);
    }

    /**
     * PUT method to update the selected ingredient
     * @param ingredient
     * @param ingredientId
     * @return the updated ingredient
     * @since 1.0
     */
    @PutMapping("/ingredient/{ingredientId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Ingredient UpdateIngredient(@RequestBody Ingredient ingredient, @PathVariable String ingredientId){
        Ingredient currentIngredient = ingredientService.findIngredientById(ingredientId);
        currentIngredient.setName(ingredient.getName());
        currentIngredient.setQuantity(ingredient.getQuantity());
        currentIngredient.setPrice(ingredient.getPrice());
        ingredientService.addIngredient(currentIngredient);
        return currentIngredient;
    }



}
