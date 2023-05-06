package com.thegreatestteam.backend.controller;

import com.google.gson.Gson;
import com.thegreatestteam.backend.model.Food;
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

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class FoodControllerTest {
    @Autowired
    private MockMvc mcv;
    private RequestBuilder request;
    private Gson gson;

    /**
     *  getChickenFood Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back has test chicken
    */
    @Test
    void getChickenFood() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/chicken").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].type").value("chicken"));
    }

    /**
     *  getBeefFood Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back has type beef
     */
    @Test
    void getBeefFood() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/beef").accept(MediaType.APPLICATION_JSON);;
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].type").value("beef"));
    }

    /**
     *  getSideFood Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back has type side
     */
    @Test
    void getSideFood() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/side").accept(MediaType.APPLICATION_JSON);;
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].type").value("side"));
    }

    /**
     *  getChipFood Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back has type chip
     */
    @Test
    void getChipFood() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/chip").accept(MediaType.APPLICATION_JSON);;
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].type").value("chip"));
    }

    /**
     *  getNewDishIngredient Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back exist
     */
    @Test
    void getNewDishIngredient() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/newDish").accept(MediaType.APPLICATION_JSON);;
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists());
    }

    /**
     *  getEditDish Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP GET request
     *  This test should return an HTTP response of 200
     *  Check if it returns data back exist
     */
    @Test
    void getEditDish() throws Exception {
        request = MockMvcRequestBuilders.get("/staff/menu/edit/63184a91169a5c4d695cae61").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists());
    }
    /**
     *  addNewFood Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP POST request
     *  This test should return an HTTP response of 201
     *  Check if the data exist in the database by Sending a GET request and check if the data exist
     */
    @Test
    void addNewFood() throws Exception {
        Map<String, Double> components = new HashMap<>();
        components.put("beef",1.0);
        gson = new Gson();
        Food food = new Food("TEST","TestFOOD",1,"testing",10,components,"Test");
        request = MockMvcRequestBuilders.post("/staff/menu/newDish").
                contentType(MediaType.APPLICATION_JSON).
                content(gson.toJson(food)).
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isCreated()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").exists()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").value("TestFOOD"));;
    }

    /**
     *  updateDish Test class
     *  Using the combination of JUnit 5 with MockMVC to test HTTP PUT request
     *  This test should return an HTTP response of 204 (No Content)
     *  Updating the Food data from the addNewFood Test
     *  Check if the data exist in the database by Sending a GET request and check if the data exist
     */
    @Test
    void updateDish() throws Exception {
        gson = new Gson();
        Map<String, Double> components = new HashMap<>();
        components.put("beef",10000.0);
        Food food = new Food("TEST","TestFOOD-2",1,"testing",10,components,"Test");
        request = MockMvcRequestBuilders.put("/staff/menu/edit/TEST").
                contentType(MediaType.APPLICATION_JSON).
                content(gson.toJson(food)).
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isNoContent()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").exists()).
                andExpect(MockMvcResultMatchers.jsonPath("$.name").value("TestFOOD-2"));
    }

    /**
     *  CheckSoldOut Test class
     *  Using the combination of JUnit 5 with MockMVC to test if the server can set food state to soldout
     *  If the ingredient is not enough
     *  This test should return an HTTP response of 200 (isOK)
     *  check if the soldout state for the testing food is true
     */
    @Test
    void checkSoldOut() throws Exception{
        request = MockMvcRequestBuilders.get("/staff/menu/testing").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[0].soldOut").value(true));
    }
    /**
     *  checkCrash Test class
     *  Using the combination of JUnit 5 with MockMVC to test if the server can set food state to crash
     *  If the ingredient is doesn't exist
     *  This test should return an HTTP response of 200 (isOK)
     *  check if the crash state for the testing food is true
     */
    @Test
    void checkCrash() throws Exception{
        Map<String, Double> components = new HashMap<>();
        components.put("testing",1.0);
        gson = new Gson();
        Food food = new Food("TEST-2","TestCrushFood",1,"testing",10,components,"Test");
        request = MockMvcRequestBuilders.post("/staff/menu/newDish").
                contentType(MediaType.APPLICATION_JSON).
                content(gson.toJson(food)).
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).andExpect(status().isCreated());
        request = MockMvcRequestBuilders.get("/staff/menu/testing").
                accept(MediaType.APPLICATION_JSON);
        mcv.perform(request).
                andDo(print()).
                andExpect(status().isOk()).
                andExpect(MockMvcResultMatchers.jsonPath("$[1].crash").value(true));

    }
}