package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	List<Payment> findAllByUserSeqOrderByPaymentSeqDesc(@Param("userSeq") int userSeq);
}
