package com.d105.pop4u;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// 테스트 시 유저 제외
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

//@SpringBootApplication
// 테스트 시 유저 제외
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan(basePackages = "com.d105.pop4u", excludeFilters = {
        @ComponentScan.Filter(type = FilterType.REGEX, pattern = "com\\.d105\\.pop4u\\.domain\\.user\\..*")
})
public class Pop4uApplication {

    public static void main(String[] args) {
        SpringApplication.run(Pop4uApplication.class, args);
    }
     
}
