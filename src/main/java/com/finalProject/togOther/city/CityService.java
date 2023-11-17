package com.finalProject.togOther.city;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CityDTO;

public interface CityService {

	public ResponseEntity<CityDTO> getCityByCitySeq(int citySeq);

	public ResponseEntity<List<CityDTO>> getCityList();

	public ResponseEntity<CityDTO> getCityByCityName(String keyword);

}
