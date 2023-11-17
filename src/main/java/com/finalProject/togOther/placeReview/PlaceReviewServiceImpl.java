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

}
