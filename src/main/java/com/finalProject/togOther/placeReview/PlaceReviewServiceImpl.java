package com.finalProject.togOther.placeReview;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.PlaceReview;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.dto.PlaceReviewDTO;
import com.finalProject.togOther.repository.PlaceRepository;
import com.finalProject.togOther.repository.PlaceReviewRepository;
import com.finalProject.togOther.repository.UserRepository;

@Service
public class PlaceReviewServiceImpl implements PlaceReviewService {

	private PlaceReviewRepository placeReviewRepository;
	
	private PlaceRepository placeRepository;

	private UserRepository userRepository;
	
	public PlaceReviewServiceImpl(PlaceReviewRepository placeReviewRepository, UserRepository userRepository, PlaceRepository placeRepository) {
		this.placeReviewRepository = placeReviewRepository;
		this.userRepository = userRepository;
		this.placeRepository = placeRepository;
	}
	
	@Override
	public ResponseEntity<?> addPlaceReview(int placeSeq, PlaceReviewDTO placeReviewDTO) {
		
		try {
			User user = userRepository.findById(placeReviewDTO.getUser().getUserSeq()).get();
			
			placeReviewDTO.setUser(user);	
			
			PlaceReview placeReview = PlaceReview.toEntity(placeReviewDTO);
			
			placeReviewRepository.save(placeReview);
			
			Optional<Place> optionalPlace = placeRepository.findById(placeSeq);
			
			Place place = optionalPlace.orElseThrow();
			
			PlaceDTO placeDTO = PlaceDTO.toDTO(place);
			
			placeDTO.setReviewCnt(placeDTO.getReviewCnt() + 1);
			
			placeRepository.save(Place.toEntity(placeDTO));
			
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
	
	
	@Override
	public ResponseEntity<?> getPlaceReviewListByReviewSeq(int reviewSeq) {
		try {
			Optional<PlaceReview> placeReviewOptional = placeReviewRepository.findById(reviewSeq);

			PlaceReview placeReview = placeReviewOptional.orElseThrow();
			
			PlaceReviewDTO placeReviewDTO = PlaceReviewDTO.toDTO(placeReview);
		
			return ResponseEntity.ok(placeReviewDTO);

		} catch (Exception e) {
			// 예외가 발생한 경우 클라이언트에게 적절한 에러 메시지와 상태 코드를 반환
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 불러오기 중 오류 발생: " + e.getMessage());
		}
	}

	@Override
	public ResponseEntity<String> deletePlaceReviewByReviewSeq(int placeSeq, int reviewSeq) {
		try {
			// 리뷰 삭제 서비스 호출			
			placeReviewRepository.deleteById(reviewSeq);
			
			Optional<Place> optionalPlace = placeRepository.findById(placeSeq);
			
			Place place = optionalPlace.orElseThrow();
			
			PlaceDTO placeDTO = PlaceDTO.toDTO(place);
			
			placeDTO.setReviewCnt(placeDTO.getReviewCnt() - 1);
			
			placeRepository.save(Place.toEntity(placeDTO));

			// 사용자가 성공적으로 삭제되었을 때
			String responseMessage = "리뷰가 삭제되었습니다.";
			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 사용자 삭제 중 에러가 발생했을 때
			String errorMessage = "리뷰 삭제 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	

	@Override
	public ResponseEntity<PlaceReviewDTO> updateReview(int reviewSeq, PlaceReviewDTO placeReviewDTO) {
		try {

			Optional<PlaceReview> reviewOptional = placeReviewRepository.findById(reviewSeq);

			PlaceReview placeReview =reviewOptional.orElseThrow();
			
			PlaceReviewDTO placeDTO = PlaceReviewDTO.toDTO(placeReview);
			
			placeDTO.setContext(placeReviewDTO.getContext());
			placeDTO.setImage(placeReviewDTO.getImage());

			PlaceReview updatedPlaceReview = placeReviewRepository.save(PlaceReview.toEntity(placeDTO));

			return ResponseEntity.ok(PlaceReviewDTO.toDTO(updatedPlaceReview));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Override
	public ResponseEntity<?> getPlaceReviewByUserSeq(int userSeq) {
	    try {
	        List<PlaceReview> placeReviewList = placeReviewRepository.findByUser_UserSeq(userSeq);

	        List<PlaceReviewDTO> placeReviewDTOList = new ArrayList<>();

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
