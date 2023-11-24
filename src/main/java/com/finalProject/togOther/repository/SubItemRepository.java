package com.finalProject.togOther.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.SubItem;

public interface SubItemRepository extends JpaRepository<SubItem, Integer> {
	List<SubItem> findByPlMainSeq(int plMainSeq);

	List<SubItem> findByToMainSeq(int toMainSeq);
}
