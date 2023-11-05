package com.finalProject.togOther.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.User;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

	public List<Place> findByCitySeq(int citySeq);
	
	
}
