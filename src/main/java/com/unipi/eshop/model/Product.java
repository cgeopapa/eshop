package com.unipi.eshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int pid;

    private final String name;

    public Product(int pid, String name)
    {
        this.pid = pid;
        this.name = name;
    }

    public Product() {
        this.name = "";
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
