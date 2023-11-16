package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.Place;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

	public List<Place> findByCitySeq(int citySeq);	
}
