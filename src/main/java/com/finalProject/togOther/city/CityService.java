package com.finalProject.togOther.city;

import java.util.List;

import com.finalProject.togOther.dto.CityDTO;

public interface CityService {

   public List<CityDTO> getCityList(String countryName);

   public CityDTO getCityByCityName(String cityName);

}