package com.unipi.eshop.model;

import javax.persistence.*;
import java.util.List;

@Entity(name = "user_info")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int uid;
    private String userName;
    private String password;

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public User() {
    }

    @OneToMany
    private List<Product> products;

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public int getUid() {
        return uid;
    }

    public List<Product> getProducts() {
        return products;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
