package com.finalProject.togOther.tourPackage;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.PaymentDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.TourPackageDTO;

@RestController
@RequestMapping("api/tourPackage")
public class TourPackageController {
	
	private TourPackageService tourpackageService;
	
	public TourPackageController(TourPackageService tourPackageService) {
		this.tourpackageService = tourPackageService;
	}
	
	@GetMapping(path ="getTourPackageList")
	public ResponseEntity<?> getTourPackageList() {
		return tourpackageService.getTourPackageList();
	}
	
	// citySeq값에 따른 장소 불러오기
	@GetMapping(path = "getTourPackageByCitySeq/{citySeq}")
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(@PathVariable int citySeq) {
		return tourpackageService.getTourPackageByCitySeq(citySeq);
	}
	
	// tqSeq값에 따른 자
	@GetMapping(path = "getTourPackageByTpSeq/{tpSeq}")
	public ResponseEntity<?> getTourPackageByTpSeq(@PathVariable int tpSeq) {
		System.out.println(tpSeq);
		return tourpackageService.getTourPackageByTpSeq(tpSeq);
	}
	
	// 예약 내역 넣기
	@PostMapping(path = "addPayment")
	public ResponseEntity<Integer> addPayment(@RequestBody PaymentDTO paymentDTO) {
		return tourpackageService.addPayment(paymentDTO);
	}
	
	// tqSeq값에 따른 자
	@GetMapping(path = "getPaymentBySeq/{paymentSeq}")
	public ResponseEntity<PaymentDTO> getPaymentBySeq(@PathVariable int paymentSeq) {
		return tourpackageService.getPaymentBySeq(paymentSeq);
	}
	
	// tqSeq값에 따른 자
	@GetMapping(path = "getPaymentList/{userSeq}")
	public ResponseEntity<List<PaymentDTO>> getPaymentList(@PathVariable int userSeq) {
		return tourpackageService.getPaymentList(userSeq);
	}
	
	// tqSeq값에 따른 자
	@GetMapping(path = "getPaymentAll")
	public ResponseEntity<List<PaymentDTO>> getPaymentAll() {
		return tourpackageService.getPaymentAll();
	}
}
