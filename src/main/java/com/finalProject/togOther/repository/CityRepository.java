package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.City;

public interface CityRepository extends JpaRepository<City, Integer> {

   public void findByCityName(String cityName);
}

