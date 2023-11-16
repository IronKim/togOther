package com.finalProject.togOther.city;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.repository.CityRepository;
import com.finalProject.togOther.repository.PlaceRepository;

@Service
public class CityServiceImpl implements CityService{

	private	CityRepository cityRepository;
	
	public CityServiceImpl(CityRepository cityRepository) {
	      this.cityRepository = cityRepository;
	   }
	
	@Override
	public ResponseEntity<List<CityDTO>> getCityList() {
		try {
			List<City> cityList = cityRepository.findAll();
			
			List<CityDTO> cityDTOList = new ArrayList<CityDTO>();
			
			for (City city : cityList) {
				
				CityDTO cityDTO = CityDTO.toDTO(city);
				
				cityDTOList.add(cityDTO);
			}
				
			return ResponseEntity.ok(cityDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<CityDTO> getCityByCityName(String keyword) {

		try {
			Optional<City> cityOptional = cityRepository.findBycityName(keyword);
			
			City city = cityOptional.orElseThrow();
			
			CityDTO cityDTO = CityDTO.toDTO(city);
			
			return ResponseEntity.ok(cityDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
