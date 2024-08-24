package com.example.demo;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(PersonsRepository repository) {
		return (args) -> {
			// save a few persons
			repository.save(new Person("John", "Doe", "IT"));
			repository.save(new Person("John", "Smith", "tester"));

			// fetch all persons
			repository.findAll().forEach(person -> {
				System.out.println(person.toString());
			});
		};
	}

}
