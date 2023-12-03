package com.finalProject.togOther.domain;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.dto.PaymentDTO;
import com.finalProject.togOther.dto.PlannerDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentSeq;
	private int userSeq;
	private int tpSeq;
    private String title;
    private LocalDate useDate;
    private String price;
    private int count ;
    private String method;
    @Column(nullable = false)
	@CreationTimestamp
	private Timestamp logTime;
    private String bookerName;
    private String bookerGender;
	private LocalDate bookerBirthday;
	private String bookerTel;
	private String bookerEmail;
	@Column(columnDefinition = "TEXT")
	private String bookerWish;
	
	
	public static Payment toEntity(PaymentDTO paymentDTO) {
		
		return Payment.builder()
				.paymentSeq(paymentDTO.getPaymentSeq())
				.userSeq(paymentDTO.getUserSeq())
				.tpSeq(paymentDTO.getTpSeq())
				.title(paymentDTO.getTitle())
				.useDate(paymentDTO.getUseDate())
				.price(paymentDTO.getPrice())
				.count(paymentDTO.getCount())
				.method(paymentDTO.getMethod())
				.logTime(paymentDTO.getLogTime())
				.bookerName(paymentDTO.getBookerName())
				.bookerGender(paymentDTO.getBookerGender())
				.bookerBirthday(paymentDTO.getBookerBirthday())
				.bookerTel(paymentDTO.getBookerTel())
				.bookerEmail(paymentDTO.getBookerEmail())
				.bookerWish(paymentDTO.getBookerWish())
				.build();
	}
	
}