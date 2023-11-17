package com.finalProject.togOther.together;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.Together;
import com.finalProject.togOther.dto.TogetherDTO;
import com.finalProject.togOther.repository.CityRepository;
import com.finalProject.togOther.repository.PlaceRepository;
import com.finalProject.togOther.repository.TogetherRepository;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TogetherServiceImpl implements TogetherService {

	private CityRepository cityRepository;

	private PlaceRepository placeRepository;

	private UserRepository userRepository;

	private TogetherRepository togetherRepository;

	public TogetherServiceImpl(CityRepository cityRepository, PlaceRepository placeRepository,
			UserRepository userRepository, TogetherRepository togetherRepository) {
		this.cityRepository = cityRepository;
		this.placeRepository = placeRepository;
		this.userRepository = userRepository;
		this.togetherRepository = togetherRepository;
	}

	@Override
	public ResponseEntity<String> addTogether(TogetherDTO togetherDTO) {

		Together together = Together.toEntity(togetherDTO);
		try {
			togetherRepository.save(together);

			String responseMessage = "동행이 추가되었습니다.";

			return ResponseEntity.ok(responseMessage);
		} catch (Exception e) {
			String errorMessage = "동행 추가 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}

	}

}
