package com.finalProject.togOther.city;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.CityDTO;

@RestController
@RequestMapping("api/city")
public class CityController {
   
   private CityService cityService;

   public CityController(CityService cityService) {
      this.cityService = cityService;
   }
   
   @GetMapping(path = "getCityList")
   public List<CityDTO> getCityList(String countryName) {
      return cityService.getCityList(countryName);
   }
   
   @GetMapping(path = "getCityList/{cityName}")
   public CityDTO getCityByCityName(@PathVariable String cityName) {
      return cityService.getCityByCityName(cityName);
   }
   
   @GetMapping(path = "getCity/{citySeq}")
   public ResponseEntity<CityDTO> getCityByCitySeq(@PathVariable int citySeq) {
	   return cityService.getCityByCitySeq(citySeq);
   }
   

}