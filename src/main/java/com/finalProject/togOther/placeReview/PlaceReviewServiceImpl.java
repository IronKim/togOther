package com.finalProject.togOther.placeReview;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.PlaceReview;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.PlaceReviewDTO;
import com.finalProject.togOther.repository.PlaceReviewRepository;
import com.finalProject.togOther.repository.UserRepository;

@Service
public class PlaceReviewServiceImpl implements PlaceReviewService {

	private PlaceReviewRepository placeReviewRepository;

	private UserRepository userRepository;
	
	public PlaceReviewServiceImpl(PlaceReviewRepository placeReviewRepository, UserRepository userRepository) {
		this.placeReviewRepository = placeReviewRepository;
		this.userRepository = userRepository;
	}
	
	@Override
	public ResponseEntity<?> addPlaceReview(PlaceReviewDTO placeReviewDTO) {
		
		try {
			User user = userRepository.findById(placeReviewDTO.getUser().getUserSeq()).get();
			
			placeReviewDTO.setUser(user);	
			
			PlaceReview placeReview = PlaceReview.toEntity(placeReviewDTO);
			
			placeReviewRepository.save(placeReview);
			
			String responseMessage = "리뷰가 추가되었습니다.";

			return ResponseEntity.ok(responseMessage);
		}catch (Exception e) {
			e.printStackTrace();
			String errorMessage = "리뷰 등록중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}
	

	@Override
	public ResponseEntity<?> getPlaceReviewByPlaceSeq(int placeSeq) {

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
