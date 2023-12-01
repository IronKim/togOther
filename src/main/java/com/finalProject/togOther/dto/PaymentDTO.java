package com.finalProject.togOther.dto;

import java.time.LocalDate;

import com.finalProject.togOther.domain.Payment;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PaymentDTO {


	private int paymentSeq;
	private int userSeq;
	private int tpSeq;
    private String title;
    private LocalDate useDate;
    private String price;
    private int count ;
    private String bookerName;
    private String bookerGender;
	private LocalDate bookerBirthday;
	private String bookerTel;
	private String bookerEmail;
	private String bookerWish;
	
	public static PaymentDTO toDTO(Payment payment) {
		return PaymentDTO.builder()
						.paymentSeq(payment.getPaymentSeq())
						.userSeq(payment.getUserSeq())
						.tpSeq(payment.getTpSeq())
						.title(payment.getTitle())
						.useDate(payment.getUseDate())
						.price(payment.getPrice())
						.count(payment.getCount())
						.bookerName(payment.getBookerName())
						.bookerGender(payment.getBookerGender())
						.bookerBirthday(payment.getBookerBirthday())
						.bookerTel(payment.getBookerTel())
						.bookerEmail(payment.getBookerEmail())
						.bookerWish(payment.getBookerWish())
						.build();
	}
}
