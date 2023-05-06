package com.thegreatestteam.backend.controller;


import com.thegreatestteam.backend.model.Ingredient;
import com.thegreatestteam.backend.model.Order;
import com.thegreatestteam.backend.model.OrderStatus;
import com.thegreatestteam.backend.model.Staff;
import com.thegreatestteam.backend.service.FoodService;
import com.thegreatestteam.backend.service.IngredientService;
import com.thegreatestteam.backend.service.OrderService;
import com.thegreatestteam.backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"${frontend.host.heroku}", "${frontend.host.local}", "${frontend.host.heroku2}"})

@RequestMapping("/staff")
public class StaffController {
    private final StaffService staffService;

    private final IngredientService ingredientService;
    private final FoodService foodService;
    private final OrderService orderService;

    @Autowired
    public StaffController(StaffService staffService, IngredientService ingredientService, OrderService orderService, FoodService foodService){
        this.staffService = staffService;
        this.ingredientService = ingredientService;
        this.orderService = orderService;
        this.foodService =foodService;
    }

    // Staff dashboard

    /**
     * Empty testing instance to conduct information transformation
     * @return
     */
    @GetMapping("/dashboard")
    @ResponseStatus(HttpStatus.OK)
    public String getDashboard(){
        return "Getting Dashboard page";
    }

    // Staff Profile

    /**
     * profile page for the staff dashboard
     * @param staffId staff id generated and provided by the frontend
     * @return the success message
     */
    @GetMapping("/{staffId}/profile")
    @ResponseStatus(HttpStatus.OK)
    public String getProfile(@PathVariable String staffId){
        return "getting profile page";
    }
    // Add staff (one time operation)

    @PostMapping("/addStaff")
    @ResponseStatus(HttpStatus.CREATED)
    public void addStaff(@RequestBody Staff staff){
        staffService.addStaff(staff);
    }


    // get raw material

    /**
     * dashboard ingredients pages
     * @return list of all ingredients in the database
     */
    @GetMapping("/dashboard/ingredients")
    @ResponseStatus(HttpStatus.OK)
    public List<Ingredient> displayAllIngredients(){
        return ingredientService.getAllIngredient();
    }



    // Order summary

    /**
     * get the page of all orders information
     * @return list of all orders
     */
    @GetMapping("/allOrders")
    @ResponseStatus(HttpStatus.OK)
    public List<Order> displayAllOrder(){
        return orderService.getAllOrder();
    }

    /**
     * complete icon for changing the order status to complete
     * @param id order id for match up
     */
    @PostMapping("/completeOrder/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void completeOrder(@PathVariable String id){
        Order order = orderService.getOrderById(id);
        order.setOrderStatus(OrderStatus.COMPLETED);
        orderService.addOrder(order);
    }

    /**
     * delete order by the provided id
     * @param id order id provided by the frontend
     */
    @DeleteMapping("/deleteOrder/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String id){
        orderService.deleteById(id);
    }


}
