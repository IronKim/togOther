package com.finalProject.togOther.main;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.dto.MainDTO;
import com.finalProject.togOther.repository.CityRepository;
import com.finalProject.togOther.repository.ContinentRepository;
import com.finalProject.togOther.repository.CountryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MainServiceImpl implements MainService {
	
	private	CityRepository cityRepository;
	private	CountryRepository countryRepository;
	private	ContinentRepository continentRepository;
	
	public MainServiceImpl(CityRepository cityRepository, CountryRepository countryRepository, ContinentRepository continentRepository) {
		this.cityRepository = cityRepository;
		this.countryRepository = countryRepository;
		this.continentRepository = continentRepository;
	}
	
	@Override
	public ResponseEntity<List<MainDTO>> getCity() {
		try {
			List<City> cityList = cityRepository.findAll();
			
			List<MainDTO> mainDTOList = new ArrayList<MainDTO>();
			
			for (City city : cityList) {
				
				MainDTO mainDTO = MainDTO.toDTO(city);
				
				mainDTOList.add(mainDTO);
			}
				
			return ResponseEntity.ok(mainDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<List<MainDTO>> getCountry() {
		try {
			List<City> cityList = countryRepository.findAll();
			
			List<MainDTO> mainDTOList = new ArrayList<MainDTO>();
			
			for (City city : cityList) {
				
				MainDTO mainDTO = MainDTO.toDTO(city);
				
				mainDTOList.add(mainDTO);
			}
				
			return ResponseEntity.ok(mainDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<List<MainDTO>> getRegion() {
		try {
			List<City> cityList = continentRepository.findAll();
			
			List<MainDTO> mainDTOList = new ArrayList<MainDTO>();
			
			for (City city : cityList) {
				
				MainDTO mainDTO = MainDTO.toDTO(city);
				
				mainDTOList.add(mainDTO);
			}
				
			return ResponseEntity.ok(mainDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<List<MainDTO>> getImage() {
		try {
			List<City> cityList = continentRepository.findAll();
			
			List<MainDTO> mainDTOList = new ArrayList<MainDTO>();
			
			for (City city : cityList) {
				
				MainDTO mainDTO = MainDTO.toDTO(city);
				
				mainDTOList.add(mainDTO);
			}
				
			return ResponseEntity.ok(mainDTOList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
