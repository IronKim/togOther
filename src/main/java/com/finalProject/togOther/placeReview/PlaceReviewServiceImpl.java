package com.finalProject.togOther.placeReview;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.PlaceReview;
import com.finalProject.togOther.dto.PlaceReviewDTO;
import com.finalProject.togOther.repository.PlaceReviewRepository;

@Service
public class PlaceReviewServiceImpl implements PlaceReviewService {

	private PlaceReviewRepository placeReviewRepository;

	public PlaceReviewServiceImpl(PlaceReviewRepository placeReviewRepository) {
		this.placeReviewRepository = placeReviewRepository;
	}

	@Override
	public ResponseEntity<List<PlaceReviewDTO>> getPlaceReviewByPlaceSeq(int placeSeq) {

		try {
			List<PlaceReview> placeReviewList = placeReviewRepository.findByPlaceSeq(placeSeq);

			List<PlaceReviewDTO> placeReviewDTOList = new ArrayList<PlaceReviewDTO>();

			for (PlaceReview placeReview : placeReviewList) {

				PlaceReviewDTO placeReviewDTO = PlaceReviewDTO.toDTO(placeReview);
				placeReviewDTOList.add(placeReviewDTO);
			}

			return ResponseEntity.ok(placeReviewDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<String> addPlaceReview(PlaceReviewDTO placeReviewDTO) {
		PlaceReview placeReview = PlaceReview.toEntity(placeReviewDTO);
		
		try {
			placeReviewRepository.save(placeReview);
			
			String responseMessage = "리뷰가 추가되었습니다.";

			return ResponseEntity.ok(responseMessage);
		}catch (Exception e) {
			String errorMessage = "리뷰 등록중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}

}
