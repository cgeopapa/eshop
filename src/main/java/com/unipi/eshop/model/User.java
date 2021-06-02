package com.unipi.eshop.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int uid;

    @OneToMany
    private List<Product> products;

    public User(int uid, List<Product> products) {
        this.uid = uid;
        this.products = products;
    }

    public User() {}

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public int getUid() {
        return uid;
    }

    public List<Product> getProducts() {
        return products;
    }
}
