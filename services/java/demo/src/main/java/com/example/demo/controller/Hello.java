package com.example.demo.controller;

import com.example.demo.dao.Person;
import com.example.demo.service.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
public class Hello {
    @Autowired
    private PersonServiceImpl personService;

    @GetMapping("/hello")
    public ResponseEntity<Map<String,String>> hello(@RequestParam(value = "name", defaultValue = "World") String name){
        Map<String,String> json= Map.of("message", "Hello " + name + "!");
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @GetMapping("/person")
    public List<Person> getPersons() {
        return personService.getPersons();
    }

    @GetMapping("/person/id/{id}")
    public Person getPersonById(@PathVariable(value = "id") int id) {
        return personService.getPersonById(id);
    }

    @GetMapping("/person/surname/{surname}")
    public Person getPersonBySurname(@PathVariable(value = "surname") String surname) {
        return personService.getPersonBySurname(surname);
    }

    @PostMapping("/create")
    public Person createPerson(@RequestParam(value = "name") String name,
                               @RequestParam(value = "surname") String surname,
                               @RequestParam(value = "job") String job) {

        return personService.create(new Person(name, surname, job));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>> deletePerson(@PathVariable(value = "id") int id) {
        Person person = personService.getPersonById(id);
        if(person == null){
            Map<String,String> json= Map.of("message", "Person with id " + id + " not found!");
            return new ResponseEntity<>(json, HttpStatus.NOT_FOUND);
        }
        personService.delete(person);
        Map<String,String> json= Map.of("message", "Person with id " + id + " deleted!");
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public Person updatePerson(@PathVariable(value = "id") int id,
                               @RequestParam(value = "name") String name,
                               @RequestParam(value = "surname") String surname,
                               @RequestParam(value = "job") String job) {
        Person person = personService.getPersonById(id);
        if (person != null){
            person.setName(name);
            person.setSurname(surname);
            person.setJob(job);
            return personService.create(person);
        }
        return null;
    }
}
