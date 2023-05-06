package com.thegreatestteam.backend.service;

import com.thegreatestteam.backend.model.Food;
import com.thegreatestteam.backend.model.Order;
import com.thegreatestteam.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderService {
    public OrderService(OrderRepository orderRepository, FoodService foodService, IngredientService ingredientService) {
        this.orderRepository = orderRepository;
        this.foodService = foodService;
        this.ingredientService = ingredientService;
    }

    @Autowired
    private OrderRepository orderRepository;
    private FoodService foodService;
    private IngredientService ingredientService;

    /**
     * Get order by the phoneNumber
     * @param phoneNumber phonenumber in string format
     * @return
     */
    public List<Order> getOrderByPhoneNumber(String phoneNumber){
        return orderRepository.findOrdersByPhoneNumber(phoneNumber);
    }

    /**
     * Update the quantity for the ingredient after the order is placed
     * @param order
     * @since 1.0
     */
    public void UpdateQuantityForIngredient(Order order){
        for(Map.Entry<String,List<Object>> dish: order.getCart().entrySet()){
            Food food = foodService.getFoodById(dish.getKey());
            if(food == null){
                break;
            }
            for(int i = 0; i< (Integer) dish.getValue().get(0);i++){
                for(Map.Entry<String,Double> pair: food.getComponents().entrySet()){
                    if(ingredientService.findIngredientByName(pair.getKey()) == null){
                        continue;
                    }
                    double stock = ingredientService.findIngredientByName(pair.getKey()).getQuantity();
                    stock = stock - pair.getValue();
                    ingredientService.findIngredientByName(pair.getKey()).setQuantity(stock);
                }
            }
        }
    }

    /**
     * Update the quantity for the ingredient after the order is placed
     * @param order
     * @return 0 if the ingredient is crushed
     *         1 if the stock isn't enough
     *         2 if the order can be place
     * @since 1.0
     */
    public Integer checkQuantity(Order order){
        for(Map.Entry<String,List<Object>> dish: order.getCart().entrySet()){
            Food food = foodService.getFoodById(dish.getKey());
            if(food == null){
                return 0;
            }

            int foodQuantity = (Integer) dish.getValue().get(0);

            for(Map.Entry<String,Double> pair: food.getComponents().entrySet()){
                if(pair.getValue() == 0){
                    continue;
                }

                if(ingredientService.findIngredientByName(pair.getKey()) == null &&
                    pair.getValue() != 0){
                    return 0;
                }

                double stock = ingredientService.findIngredientByName(pair.getKey()).getQuantity();

                double overallQuantity = pair.getValue() * foodQuantity;
                if(stock - overallQuantity < 0){
                    return 1;
                }
            }
        }
        return 2;
    }

    /**
     * Add order detail to the database
     * @param order
     * @since 1.0
     */
    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    /**
     * Get all orders
     * @return all orders in a list
     * @since 1.0
     */
    public List<Order> getAllOrder(){
        return orderRepository.findAll();
    }

    /**
     * Get order by its id
     * @param id
     * @return the selected order with the same id
     * @since 1.0
     */
    public Order getOrderById(String id){
        return orderRepository.getOrderById(id);
    }

    /**
     * delete order by its id
     * @param id
     * @since 1.0
     */
    public void deleteById(String id){
        orderRepository.deleteOrderById(id);
    }

}
