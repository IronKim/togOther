package com.finalProject.togOther.placeReview;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.PlaceReviewDTO;

@RestController
@RequestMapping("api/placeReview")
public class PlaceReviewController {
	
	private PlaceReviewService placeReviewService;
	
	
	public PlaceReviewController(PlaceReviewService placeReviewService) {
	      this.placeReviewService = placeReviewService;
	   }
	
	 @GetMapping(path = "getPlaceReviewList/{placeSeq}")
	   public ResponseEntity<List<PlaceReviewDTO>> getPlaceReviewByPlaceSeq(@PathVariable int placeSeq) {
		   return placeReviewService.getPlaceReviewByPlaceSeq(placeSeq);
	   }
}
