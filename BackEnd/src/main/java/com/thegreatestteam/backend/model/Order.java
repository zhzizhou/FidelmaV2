package com.thegreatestteam.backend.model;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class Order {
    private String id;
    private String name;
    @NonNull
    private Integer tableNumber;
    @NonNull
    private String phoneNumber;
    private Map<String, List<Object>> cart;
    private OrderStatus orderStatus;

    public Order(@NonNull Integer tableNumber, @NonNull String phoneNumber, Map<String, List<Object>> cart, String id) {
        this.id = id;
        this.tableNumber = tableNumber;
        this.phoneNumber= phoneNumber;
        this.cart = cart;
        this.orderStatus = OrderStatus.PREPARING;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NonNull
    public Integer getTableNumber() {
        return tableNumber;
    }

    @NonNull
    public String getPhoneNumber() {
        return phoneNumber;
    }


    public Map<String, List<Object>> getCart() {
        return cart;
    }

    public void setCart(Map<String, List<Object>> cart) {
        this.cart = cart;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getId() {
        return id;
    }

}
