package com.d105.pop4u.domain.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserViewController {
    @GetMapping("/login")
    public String login() {
        return "oauthLogin";
    }

    @GetMapping("/join")
    public String join() {
        return "join";
    }
    
}