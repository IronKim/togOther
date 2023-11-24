package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.Together;

public interface TogetherRepository extends JpaRepository<Together, Integer> {
	
	List<Together> findAllByTitleContainingOrContextContainingOrderByTogetherSeqDesc(Pageable pageable,
			@Param("title") String search,@Param("context") String search2);
	
	long countByTitleContainingOrContextContaining(@Param("title") String search,@Param("context") String search2);
}
