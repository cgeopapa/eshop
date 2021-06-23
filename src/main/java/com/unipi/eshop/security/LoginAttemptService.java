package com.unipi.eshop.security;

import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class LoginAttemptService {

    private final int MAX_ATTEMPT = 2;
    private final HashMap<String, Integer> attemptsCache;

    public LoginAttemptService() {
        super();
        attemptsCache = new HashMap<>();
    }

    public void loginSucceeded(String key) {
        attemptsCache.remove(key);
    }

    public void loginFailed(String key) {
        int attempts = 0;
        if (attemptsCache.containsKey(key)) {
            attempts = attemptsCache.get(key) + 1;
        }
        attemptsCache.put(key, attempts);
    }

    public boolean isBlocked(String key) {
        if (attemptsCache.containsKey(key)) {
            return attemptsCache.get(key) >= MAX_ATTEMPT;
        }
        return false;
    }
}
