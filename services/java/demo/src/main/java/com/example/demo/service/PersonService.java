package com.example.demo.service;

import com.example.demo.dao.Person;

import java.util.List;

public interface PersonService {
    public List<Person> getPersons();
    public Person getPersonBySurname(String surname);
    public Person create(Person person);
    public Person getPersonById(int id);

}
