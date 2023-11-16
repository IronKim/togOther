package com.finalProject.togOther.city;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.repository.CityRepository;


@RestController
@RequestMapping("api/city")
public class CityController {

   
   private CityService cityService;
   
   public CityController(CityService cityService) {
      this.cityService = cityService;
   }
   
   //도시 리스트 불러오기
 	@GetMapping(path= "getCityList")
 	public ResponseEntity<List<CityDTO>> getCityList() {
 		return cityService.getCityList();
 	}
   
 	//도시 이름으로 불러오기
	@GetMapping(path="getCityByCityName")
	public ResponseEntity<CityDTO> getCityByCityName(@RequestParam String keyword){
		return cityService.getCityByCityName(keyword);
	}
   
   @GetMapping(path = "getCity/{citySeq}")
   public ResponseEntity<CityDTO> getCityByCitySeq(@PathVariable int citySeq) {
	   return cityService.getCityByCitySeq(citySeq);
   }
   
}

