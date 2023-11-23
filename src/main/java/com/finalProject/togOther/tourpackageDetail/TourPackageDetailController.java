package com.finalProject.togOther.tourpackageDetail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.TourPackageDetailDTO;

@RestController
@RequestMapping("api/packageDetail")
public class TourPackageDetailController {

	private TourPackageDetailService tourpackageSerDetailService;
	
	public TourPackageDetailController(TourPackageDetailService tourPackageService) {
		this.tourpackageSerDetailService = tourPackageService;
	}
	
	// 투어 패키지 상세페이지 도시 번호로 불러오기
	@GetMapping(path = "getTourDetailPackageByTpSeq/{tpSeq}")
	public ResponseEntity<TourPackageDetailDTO> getTourDetailPackageByCitySeq(@PathVariable int tpSeq) {
		return tourpackageSerDetailService.getTourDetailPackageByTpSeq(tpSeq);
	}
}
