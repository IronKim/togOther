package com.finalProject.togOther.place;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.PlaceDTO;

public interface PlaceService {

	public ResponseEntity<List<PlaceDTO>> getPlaceList(Integer placeSeq);

	public ResponseEntity<PlaceDTO> getPlaceByPlaceSeq(int placeSeq);

	public ResponseEntity<List<PlaceDTO>> getPlaceListByCitySeq(int citySeq);

	public ResponseEntity<Integer> addCustomPlace(CustomPlaceDTO customPlaceDTO);

}
