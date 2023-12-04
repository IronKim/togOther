package com.finalProject.togOther.tourPackage;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.Payment;
import com.finalProject.togOther.domain.PlannerText;
import com.finalProject.togOther.domain.TourPackage;
import com.finalProject.togOther.dto.PaymentDTO;
import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.repository.PaymentRepository;
import com.finalProject.togOther.repository.TourPackageRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourPackageServiceImpl implements TourPackageService {

	private TourPackageRepository tourPackageRepository;
	private PaymentRepository paymentRepository;

	public TourPackageServiceImpl(TourPackageRepository tourPackageRepository,
			PaymentRepository paymentRepository) {
		this.tourPackageRepository = tourPackageRepository;
		this.paymentRepository = paymentRepository;
	}


	@Override
	public ResponseEntity<?> getTourPackageList() {
		try {
			return ResponseEntity.ok(tourPackageRepository.findAll());
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	
	@Override
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq) {
		
		try {
			List<TourPackage> packageList = tourPackageRepository.findByCitySeq(citySeq);

			List<TourPackageDTO> packageDTOList = new ArrayList<TourPackageDTO>();

			for (TourPackage package1 : packageList) {

				TourPackageDTO packageDTO = TourPackageDTO.toDTO(package1);

				packageDTOList.add(packageDTO);
			}

			return ResponseEntity.ok(packageDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}


	@Override
	public ResponseEntity<?> getTourPackageByTpSeq(int tpSeq) {
		try {
			Optional<TourPackage> OptionalPackage = tourPackageRepository.findById(tpSeq);

			TourPackage tourPackage = OptionalPackage.orElseThrow(); 
			
			return ResponseEntity.ok(TourPackageDTO.toDTO(tourPackage));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}


	@Override
	public ResponseEntity<Integer> addPayment(PaymentDTO paymentDTO) {
		Payment payment = Payment.toEntity(paymentDTO);

		try {
			paymentRepository.save(payment);

			String responseMessage = "추가되었습니다.";

			int paymentSeq = payment.getPaymentSeq();
			
			return ResponseEntity.ok(paymentSeq);

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1);
		}
	}


	@Override
	public ResponseEntity<PaymentDTO> getPaymentBySeq(int paymentSeq) {
		try {
			Optional<Payment> OptionalPay = paymentRepository.findById(paymentSeq);

			Payment payment = OptionalPay.orElseThrow(); 
			
			return ResponseEntity.ok(PaymentDTO.toDTO(payment));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<List<PaymentDTO>> getPaymentList(int userSeq) {
		
		try {
			List<Payment> payList = paymentRepository.findAllByUserSeqOrderByPaymentSeqDesc(userSeq);

			List<PaymentDTO> payDTOList = new ArrayList<PaymentDTO>();

			for (Payment pay : payList) {

				PaymentDTO paymentDTO = PaymentDTO.toDTO(pay);

				payDTOList.add(paymentDTO);
			}

			return ResponseEntity.ok(payDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<List<PaymentDTO>> getPaymentAll() {
		
		try {
			List<Payment> payList = paymentRepository.findAll();
			
			List<PaymentDTO> payDTOList = new ArrayList<PaymentDTO>();
			
			for (Payment pay : payList) {
				
				PaymentDTO paymentDTO = PaymentDTO.toDTO(pay);
				
				payDTOList.add(paymentDTO);
			}
			
			return ResponseEntity.ok(payDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

}
