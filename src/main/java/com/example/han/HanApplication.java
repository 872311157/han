package com.example.han;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.han.*.mapper") //扫描的mapper
@SpringBootApplication
public class HanApplication {

	public static void main(String[] args) {
		SpringApplication.run(HanApplication.class, args);
	}

}
