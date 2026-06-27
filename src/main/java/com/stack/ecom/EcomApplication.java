package com.stack.ecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EcomApplication {

	public static void main(String[] args) {
		System.setProperty("logging.level.root", "DEBUG");
		SpringApplication.run(EcomApplication.class, args);
	}

}
