package com.d105.pop4u.global.config.kafka;

import com.d105.pop4u.domain.game.dto.GameCompletionEvent;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ProducerFactory<String, GameCompletionEvent> gameCompletionProducerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        configProps.put(ProducerConfig.ACKS_CONFIG, "all");
        // 배치 처리 설정
        configProps.put(ProducerConfig.BATCH_SIZE_CONFIG, "16384");
        configProps.put(ProducerConfig.LINGER_MS_CONFIG, "1");
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, GameCompletionEvent> gameCompletionKafkaTemplate() {
        return new KafkaTemplate<>(gameCompletionProducerFactory());
    }

    @Bean
    public ConsumerFactory<String, GameCompletionEvent> gameCompletionConsumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "game-completion-group");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ErrorHandlingDeserializer.KEY_DESERIALIZER_CLASS, StringDeserializer.class);
        config.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class.getName());
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                new JsonDeserializer<>(GameCompletionEvent.class, false)
        );
    }

//    @Bean
//    public ConsumerFactory<String, GameCompletionEvent> gameCompletionConsumerFactory() {
//        Map<String, Object> config = new HashMap<>();
//        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
//        config.put(ConsumerConfig.GROUP_ID_CONFIG, "game-completion-group");
//        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
//        // 동시성 처리를 위한 설정
//        config.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, "500");
//        // JsonDeserializer 신뢰할 수 있는 패키지 설정
//        config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
//
//        return new DefaultKafkaConsumerFactory<>(
//                config,
//                new StringDeserializer(),
//                new JsonDeserializer<>(GameCompletionEvent.class, false)
//        );
//    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, GameCompletionEvent>
    gameCompletionListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, GameCompletionEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(gameCompletionConsumerFactory());
        // 병렬 처리를 위한 설정
        factory.setConcurrency(3);  // 컨슈머 스레드 수
        factory.setBatchListener(true);
        return factory;
    }
}