package com.thegreatestteam.backend.controller;

import com.google.gson.Gson;
import com.thegreatestteam.backend.model.Ingredient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class IngredientControllerTest {

    @Autowired
    private MockMvc mcv;
    private RequestBuilder request;
    private Gson gson;


    /**
     *  getIngredient Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns ingredients back (not NULL)
     */
    @Test
    void getIngredient() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/ingredient").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists());
    }

    /**
     *  getIngredientById Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns ingredients back with name "IngredientTest"
     */
    @Test
    void getIngredientById() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/ingredient/IngredientTest").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").exists()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").value("IngredientTest"));
    }

    /**
     *  addIngredient Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP POST request
     *  This test should return an HTTP response of 201
     *  Check if it returns ingredients is added to the database
     */
    @Test
    void addIngredient() throws Exception {
        gson = new Gson();
        Ingredient ingredient = new Ingredient("IngredientTest","IngredientTest",1,10.0);
        request = MockMvcRequestBuilders.post("/staff/ingredient").
                contentType(MediaType.APPLICATION_JSON).
                content(gson.toJson(ingredient)).
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isCreated()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").exists()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").value("IngredientTest"));
    }

    /**
     *  updateIngredient Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP PUT request
     *  This test should return an HTTP response of 204
     *  Update the testing ingredient and check if it contents the right information
     */
    @Test
    void updateIngredient() throws Exception {
        gson = new Gson();
        Ingredient ingredient = new Ingredient("IngredientTest","IngredientTest-2",1,10.0);
        request = MockMvcRequestBuilders.put("/staff/ingredient/IngredientTest").
                contentType(MediaType.APPLICATION_JSON).
                content(gson.toJson(ingredient)).
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isNoContent()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").exists()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").value("IngredientTest-2"));
    }
}