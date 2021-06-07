package com.unipi.eshop;

import com.unipi.eshop.config.CustomUserDetails;
import com.unipi.eshop.config.Endpoints;
import com.unipi.eshop.dao.ProductRepository;
import com.unipi.eshop.dao.UserRepository;
import com.unipi.eshop.model.AuthenticationRequest;
import com.unipi.eshop.model.AuthenticationResponse;
import com.unipi.eshop.model.Product;
import com.unipi.eshop.model.User;
import com.unipi.eshop.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class EshopApplication {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    public static void main(String[] args) {
        SpringApplication.run(EshopApplication.class, args);
    }

    @GetMapping(value = Endpoints.products)
    public Object[] getProducts() {
        return productRepository.findAll().toArray();
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUname(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final User user = userRepository.findByUserName(request.getUname()).get();
        final String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));

//        Optional<User> dbUser = userRepository.findByUserName(user.getUserName());
//        if(dbUser.isPresent())
//        {
//
//            return passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword());
//        }
//
//        return false;
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String userAccess() {
        return "User Content.";
    }

    @PostMapping(value = "/register")
    public void setUser(@RequestParam String uname) {
        User user = new User();
        user.setUserName(uname);
        user.setPassword(passwordEncoder.encode("pass"));

        userRepository.save(user);
    }

    @PostMapping(value = Endpoints.addProductToCart)
    public int addToCart(@RequestParam int pid) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int uid = ((CustomUserDetails) principal).getUid();

        User user = userRepository.getById(uid);
        Product product = productRepository.getById(pid);

        user.getProducts().add(product);
        userRepository.save(user);

        return uid;
    }
}
