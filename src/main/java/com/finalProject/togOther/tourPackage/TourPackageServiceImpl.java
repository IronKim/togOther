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
	public ResponseEntity<String> addPayment(PaymentDTO paymentDTO) {
		Payment payment = Payment.toEntity(paymentDTO);

		try {
			paymentRepository.save(payment);

			String responseMessage = "추가되었습니다.";

			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

}
