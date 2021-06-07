package com.unipi.eshop.model;

public class AuthenticationRequest {
    private String uname;
    private String password;

    public AuthenticationRequest(String uname, String password) {
        this.uname = uname;
        this.password = password;
    }

    public AuthenticationRequest() {
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
