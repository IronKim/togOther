package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	
}
