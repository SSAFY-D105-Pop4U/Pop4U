package com.d105.pop4u.global.config;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Hibernate5Module hibernate5Module() {
        Hibernate5Module module = new Hibernate5Module();
        // Lazy 로딩된 객체를 강제로 초기화하지 않도록 설정 (필요한 경우)
        module.disable(Hibernate5Module.Feature.FORCE_LAZY_LOADING);
        return module;
    }
}
