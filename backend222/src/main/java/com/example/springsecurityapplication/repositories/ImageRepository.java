package com.example.springsecurityapplication.repositories;

import com.example.springsecurityapplication.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    void deleteByProduct_Id(int id);

    List<Image> findByProduct_Id(int id);
}