package com.finalProject.togOther.place;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.CustomPlace;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.repository.CustomPlaceRepository;
import com.finalProject.togOther.repository.PlaceRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PlaceServiceImpl implements PlaceService {
	private PlaceRepository placeRepository;

	private CustomPlaceRepository customPlaceRepository;

	public PlaceServiceImpl(PlaceRepository placeRepository, CustomPlaceRepository customPlaceRepository) {
		this.placeRepository = placeRepository;
		this.customPlaceRepository = customPlaceRepository;
	}

	@Override
	public ResponseEntity<List<PlaceDTO>> getPlaceList(Integer placeSeq) {

		try {
			List<Place> placeList = placeRepository.findAll();

			List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();

			for (Place place : placeList) {

				PlaceDTO placeDTO = PlaceDTO.toDTO(place);

				placeDTOList.add(placeDTO);
			}

			return ResponseEntity.ok(placeDTOList);

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}

	@Override
	public ResponseEntity<PlaceDTO> getPlaceByPlaceSeq(int placeSeq) {
		try {
			Optional<Place> placeOptional = placeRepository.findById(placeSeq);

			Place place = placeOptional.orElseThrow();

			PlaceDTO placeDTO = PlaceDTO.toDTO(place);

			return ResponseEntity.ok(placeDTO);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@Override
	public ResponseEntity<PlaceDTO> getPlace(int placeSeq) {
		try {
			Optional<Place> placeOptional = placeRepository.findById(placeSeq);
			
			Place place = placeOptional.orElseThrow();
			
			PlaceDTO placeDTO = PlaceDTO.toDTO(place);
			
			return ResponseEntity.ok(placeDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@Override
	public ResponseEntity<CustomPlaceDTO> getCustomPlace(int plCustomSeq) {
		try {
			Optional<CustomPlace> placeOptional = customPlaceRepository.findById(plCustomSeq);
			
			CustomPlace customPlace = placeOptional.orElseThrow();
			
			CustomPlaceDTO customPlaceDTO = CustomPlaceDTO.toDTO(customPlace);
			
			return ResponseEntity.ok(customPlaceDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Override
	public ResponseEntity<Integer> addCustomPlace(CustomPlaceDTO customPlaceDTO) {
		CustomPlace customPlace = CustomPlace.toEntity(customPlaceDTO);

		try {
			customPlaceRepository.save(customPlace);

			int customSeq = customPlace.getPlCustomSeq();

			return ResponseEntity.ok(customSeq);

		} catch (Exception e) {

			return ResponseEntity.ok(-1);
		}
	}

	@Override
	public ResponseEntity<List<PlaceDTO>> getPlaceListByCitySeq(int citySeq) {

		try {
			List<Place> placeList = placeRepository.findByCitySeq(citySeq);

			List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();

			for (Place place : placeList) {

				PlaceDTO placeDTO = PlaceDTO.toDTO(place);

				placeDTOList.add(placeDTO);
			}

			return ResponseEntity.ok(placeDTOList);

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
