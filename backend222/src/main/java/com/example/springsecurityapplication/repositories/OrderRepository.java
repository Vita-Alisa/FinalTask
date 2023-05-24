package com.example.springsecurityapplication.repositories;

import com.example.springsecurityapplication.models.Order;
import com.example.springsecurityapplication.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByPerson(Person person);

    List<Order> findByNumberContainingIgnoreCase(String number);

    void deleteAllByProduct_Id(int id);
}