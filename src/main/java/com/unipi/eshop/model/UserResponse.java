package com.unipi.eshop.model;

import java.util.List;

public class UserResponse {
    private String uname;
    private List<Product> products;

    public UserResponse(String uname, List<Product> products) {
        this.uname = uname;
        this.products = products;
    }

    public String getUname() {
        return uname;
    }

    public List<Product> getProducts() {
        return products;
    }
}
