//package com.d105.pop4u.domain.chat.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//public class ChatViewController {
//
//    @GetMapping("/chat")
//    public String chatPage(@RequestParam(name = "roomId", required = false, defaultValue = "1") Long roomId, Model model) {
//        model.addAttribute("roomId", roomId);
//        return "chat"; // ✅ chat.html을 반환
//    }
//}
