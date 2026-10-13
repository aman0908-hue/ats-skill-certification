package com.atsskill.certification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class AtsSkillCertificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(AtsSkillCertificationApplication.class, args);
    }
}
