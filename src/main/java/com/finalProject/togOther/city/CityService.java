package com.finalProject.togOther.city;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CityDTO;

public interface CityService {

   public List<CityDTO> getCityList(String countryName);

   public CityDTO getCityByCityName(String cityName);

   public ResponseEntity<CityDTO> getCityByCitySeq(int citySeq);

}