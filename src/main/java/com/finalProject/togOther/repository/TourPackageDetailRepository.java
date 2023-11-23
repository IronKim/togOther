package com.finalProject.togOther.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.TourPackageDetail;

public interface TourPackageDetailRepository extends JpaRepository<TourPackageDetail, Integer>{

	public Optional<TourPackageDetail> findByTpSeq(int tpSeq);


}
