package com.finalProject.togOther.place;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.PlaceDTO;

@RestController
@RequestMapping("api/place")
public class PlaceController {
	private PlaceService placeService;
	
	  public PlaceController(PlaceService placeService) {
	      this.placeService = placeService;
	   }
	  
	  @GetMapping(path= "getPlaceListByCitySeq/{citySeq}")
	  public ResponseEntity<List<PlaceDTO>> getPlaceListByCitySeq(@PathVariable int citySeq) {
		  return placeService.getPlaceListByCitySeq(citySeq);
	  }
	   
	  
	   @GetMapping(path = "getPlaceList")
	   public ResponseEntity<List<PlaceDTO>> getPlaceList(Integer placeSeq) {
	      return placeService.getPlaceList(placeSeq);
	   }
	   
	   @GetMapping(path = "getPlaceList/{placeSeq}")
	   public ResponseEntity<PlaceDTO> getPlaceByPlaceSeq(@PathVariable int placeSeq) {
		   return placeService.getPlaceByPlaceSeq(placeSeq);
	   }
	   
	
}
