package com.finalProject.togOther.placeReview;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlaceReviewDTO;

@RestController
@RequestMapping("api/placeReview")
public class PlaceReviewController {

	private PlaceReviewService placeReviewService;

	public PlaceReviewController(PlaceReviewService placeReviewService) {
		this.placeReviewService = placeReviewService;
	}
	
	//리뷰 작성
	@PostMapping(path = "addPlaceReview")
	public ResponseEntity<?> addPlaceReview(@RequestBody PlaceReviewDTO placeReviewDTO) {
		
		System.out.println(placeReviewDTO);
		
		System.out.println(placeReviewDTO.getUser().getName());
		
		return placeReviewService.addPlaceReview(placeReviewDTO);
	}
		
	//리뷰 불러오기
	@GetMapping(path = "getPlaceReviewList/{placeSeq}")
	public ResponseEntity<?> getPlaceReviewByPlaceSeq(@PathVariable int placeSeq) {
		return placeReviewService.getPlaceReviewByPlaceSeq(placeSeq);
	}	
	
	//리뷰 불러오기 reviewSeq
	@GetMapping(path = "getPlaceReviewListByReviewSeq/{reviewSeq}")
		public ResponseEntity<?> getPlaceReviewListByReviewSeq(@PathVariable int reviewSeq) {
		return placeReviewService.getPlaceReviewListByReviewSeq(reviewSeq);
	}	

	// 리뷰 삭제
	@DeleteMapping(path = "deletePlaceReviewByReviewSeq/{reviewSeq}")
	public ResponseEntity<String> deletePlaceReviewByReviewSeq(@PathVariable int reviewSeq) {
		return placeReviewService.deletePlaceReviewByReviewSeq(reviewSeq);
	}
	// 리뷰 수정
		@PutMapping(path = "updateReview/{reviewSeq}")
		public ResponseEntity<PlaceReviewDTO> updateReview(@PathVariable int reviewSeq, 
				@RequestBody PlaceReviewDTO placeReviewDTO) {
			System.out.println(placeReviewDTO.getContext());
			System.out.println(placeReviewDTO.getImage());
			return placeReviewService.updateReview(reviewSeq, placeReviewDTO);
		}
	
	
}
