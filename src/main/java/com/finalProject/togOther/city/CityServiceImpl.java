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

@Service
public class CityServiceImpl implements CityService {
   
   private CityRepository cityRepository;
   
   public CityServiceImpl(CityRepository cityRepository) {
      this.cityRepository = cityRepository;
   }

   @Override
   public List<CityDTO> getCityList(String countryName) {
      
      try {
         List<City> cityList = cityRepository.findAll();
         
         List<CityDTO> cityDTOList = new ArrayList<CityDTO>();
      
         for (City city : cityList) {
            CityDTO cityDTO = CityDTO.builder()
                         .citySeq(city.getCitySeq())
                         .continentName(city.getCityImage())
                         .countryName(city.getCountryName())
                         .cityName(city.getCityName())
                         .cityImage(city.getCityImage())
                         .build();
            
            cityDTOList.add(cityDTO);
         }
         
         return cityDTOList;
         
      } catch (Exception e) {
         // TODO: handle exception
      }
      
      return null;
   }

   @Override
   public CityDTO getCityByCityName(String cityName) {
      cityRepository.findByCityName(cityName);
      return null;
   }

	@Override
	public ResponseEntity<CityDTO> getCityByCitySeq(int citySeq) {
		
		try {
			Optional<City> cityOptional = cityRepository.findById(citySeq);
			
			City city = cityOptional.orElseThrow();
			
			CityDTO cityDTO = CityDTO.toDTO(city);
			
			return ResponseEntity.ok(cityDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
   
   
}