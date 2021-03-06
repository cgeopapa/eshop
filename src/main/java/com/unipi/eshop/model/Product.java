package com.unipi.eshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;
    private String name;

    public Product(int pid, String name)
    {
        this.pid = pid;
        this.name = name;
    }

    public Product() {

    }

    public int getPid()
    {
        return pid;
    }

    public String getName()
    {
        return name;
    }
}
