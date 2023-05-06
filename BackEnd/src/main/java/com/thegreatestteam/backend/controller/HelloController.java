package com.thegreatestteam.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"${frontend.host.heroku}", "${frontend.host.local}", "${frontend.host.heroku2}"})
public class HelloController {

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public String index() {
        return "Hello there, this is the main page for COMP30022 IT project";
    }

    @GetMapping("/api/users")
    @ResponseStatus(HttpStatus.OK)
    public String api() {
        return "Hello this is api /users";
    }


    @PostMapping("api/users")
    @ResponseStatus(HttpStatus.CREATED)
    public void getPost(@RequestBody String postString) {
        System.out.println(postString);
    }

}