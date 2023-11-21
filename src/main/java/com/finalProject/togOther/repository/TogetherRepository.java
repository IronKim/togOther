package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.Together;

public interface TogetherRepository extends JpaRepository<Together, Integer> {
	
	List<Together> findAllByOrderByTogetherSeqDesc(Pageable pageable);
}
