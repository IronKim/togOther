package com.finalProject.togOther.tourPackage;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.PaymentDTO;
import com.finalProject.togOther.dto.TourPackageDTO;

public interface TourPackageService {

	public ResponseEntity<?> getTourPackageList();

	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq);

	public ResponseEntity<?> getTourPackageByTpSeq(int tpSeq);

	public ResponseEntity<Integer> addPayment(PaymentDTO paymentDTO);

	public ResponseEntity<PaymentDTO> getPaymentBySeq(int paymentSeq);

	public ResponseEntity<List<PaymentDTO>> getPaymentList(int userSeq);
	
	public ResponseEntity<List<PaymentDTO>> getPaymentAll();

}
