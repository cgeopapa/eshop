package com.unipi.eshop;

import com.unipi.eshop.config.Endpoints;
import com.unipi.eshop.dao.ProductRepository;
import com.unipi.eshop.dao.UserRepository;
import com.unipi.eshop.model.AuthenticationRequest;
import com.unipi.eshop.model.Product;
import com.unipi.eshop.model.User;
import com.unipi.eshop.model.UserResponse;
import com.unipi.eshop.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;
import java.util.Properties;

@CrossOrigin(origins = "https://localhost:4200", maxAge = 3600, allowCredentials = "true")
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

    @PostMapping(value = Endpoints.login)
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUname(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final User user = userRepository.findByUserName(request.getUname()).get();
        final String jwt = jwtUtil.generateToken(user);

        Cookie cookie = new Cookie("jwt-auth-token", jwt);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        response.addCookie(cookie);

        UserResponse userResponse = new UserResponse(user.getUserName(), user.getProducts());
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping(value = Endpoints.user)
    public UserResponse getUser(Principal principal) {
        User user = getUserFromPrincipal(principal);
        return new UserResponse(user.getUserName(), user.getProducts());
    }

    @PostMapping(value = Endpoints.register)
    public void setUser(@RequestParam String uname) {
        User user = new User();
        user.setUserName(uname);
        user.setPassword(passwordEncoder.encode("pass"));

        userRepository.save(user);
    }

    @PostMapping(value = Endpoints.addProductToCart, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Product>> addToCart(@RequestParam int pid, Principal principal) {
        User user = getUserFromPrincipal(principal);
        Product product = productRepository.getById(pid);

        user.getProducts().add(product);
        userRepository.save(user);
        List<Product> products = user.getProducts();

        return ResponseEntity.ok().body(products);
    }

    @DeleteMapping(value = Endpoints.addProductToCart, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Product>> removeFromCart(@RequestParam int pid, Principal principal) {
        User user = getUserFromPrincipal(principal);
        Product product = productRepository.getById(pid);

        user.getProducts().remove(product);
        userRepository.save(user);
        List<Product> products = user.getProducts();

        return ResponseEntity.ok().body(products);
    }

    @GetMapping(value = Endpoints.sendMail)
    public void sendMail(Principal principal) {
        User user = getUserFromPrincipal(principal);

        String to = "cgeocodgod@gmail.com";
        String from = "web@gmail.com";
        String host = "localhost";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.setProperty("mail.smtp.host", host);

        // Get the default Session object.
        Session session = Session.getDefaultInstance(properties);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject("This is the Subject Line!");

            // Now set the actual message
            for (Product product : user.getProducts()) {
                message.setText(product.getName());
            }

            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    private User getUserFromPrincipal(Principal principal) {
        String uname = principal.getName();
        return userRepository.findByUserName(uname).get();
    }
}
