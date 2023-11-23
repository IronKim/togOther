package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.TourPackage;

public interface TourPackageRepository extends JpaRepository<TourPackage, Integer>{

	public List<TourPackage> findByCitySeq(int citySeq);
	
}
