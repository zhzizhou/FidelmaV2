package com.thegreatestteam.backend.controller;

import com.thegreatestteam.backend.model.Food;
import com.thegreatestteam.backend.model.Order;
import com.thegreatestteam.backend.service.FoodService;
import com.thegreatestteam.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"${frontend.host.heroku}", "${frontend.host.local}", "${frontend.host.heroku2}"})
@RequestMapping("/customer")
public class UserController {
    @Autowired
    private OrderService orderService;
    private FoodService foodService;

    public UserController(OrderService orderService, FoodService foodService) {
        this.orderService = orderService;
        this.foodService = foodService;
    }

    // front end api listed here
    @PostMapping("/orderConfirm")
    @ResponseStatus(HttpStatus.CREATED)
    public Integer addOrder(@RequestBody Order order){
        System.out.println(order.toString());
        if (orderService.checkQuantity(order) == 0 || orderService.checkQuantity(order) == 1) {
            return orderService.checkQuantity(order);
        }
        orderService.UpdateQuantityForIngredient(order);
        orderService.addOrder(order);
        return orderService.checkQuantity(order);
    }

    /**
     * Get request for the main page
     * @return a list of all orders
     */
    @GetMapping("/mainMenu")
    @ResponseStatus(HttpStatus.OK)
    public List<Order> getAllOrders(){
        return orderService.getAllOrder();
    }

    /**
     * Backend calculation for food dish quantity based on the available ingredients
     * A very hevay calculation for the backend, can be improved in the future
     * @param id food id to compute quantity
     * @return the computed value for dish quantity
     */
    @GetMapping("/foodDes/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Integer computeFoodQuan(@PathVariable String id){
        Food food = foodService.getFoodById(id);
        return foodService.computeFoodQuantity(food);
    }



}
