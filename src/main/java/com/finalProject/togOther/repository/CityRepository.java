package com.finalProject.togOther.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.City;

public interface CityRepository extends JpaRepository<City, Integer> {

	public Optional<City> findBycityName(@Param("keyword")String cityName);

}
