package com.d105.pop4u.domain.search.controller;

import com.d105.pop4u.domain.search.PopularSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final PopularSearchService popularSearchService;

    @GetMapping("/popular")
    public List<String> getPopularSearches() {
        return popularSearchService.getTopSearches(10);
    }

    @GetMapping
    public void search(@RequestParam String keyword) {
        popularSearchService.incrementSearchCount(keyword);
    }
}