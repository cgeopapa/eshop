package com.unipi.eshop;

import com.unipi.eshop.config.Endpoints;
import com.unipi.eshop.dao.ProductRepository;
import com.unipi.eshop.dao.UserRepository;
import com.unipi.eshop.model.Product;
import com.unipi.eshop.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class EshopApplication
{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(EshopApplication.class, args);
    }

    @GetMapping(value = Endpoints.products)
    public Product[] getProducts()
    {
        return (Product[]) productRepository.findAll().toArray();
//        return ("<h1>success</h1>");
    }

    @PostMapping(value = "/register")
    public void setUser(@RequestParam String uname)
    {
        User user = new User();
        user.setUserName(uname);
        user.setPassword(new BCryptPasswordEncoder().encode("pass"));

        userRepository.save(user);
    }
}
