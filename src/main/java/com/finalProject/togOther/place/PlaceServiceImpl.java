package com.finalProject.togOther.place;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.repository.PlaceRepository;

@Service
public class PlaceServiceImpl implements PlaceService {
	private PlaceRepository placeRepository;
	
	 public PlaceServiceImpl(PlaceRepository placeRepository) {
	      this.placeRepository = placeRepository;
	   }
	 
	 
	 @Override
		public ResponseEntity<List<PlaceDTO>> getPlaceListByCitySeq(int citySeq) {
		 
		 try {
	         List<Place> placeList = placeRepository.findByCitySeq(citySeq);
	         
	         List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();
	      
	         for (Place place : placeList) {
	        	 
	            PlaceDTO placeDTO = PlaceDTO.toDTO(place);
	            
	            placeDTOList.add(placeDTO);
	         }
	         
	         return ResponseEntity.ok(placeDTOList);
	         
	      } catch (Exception e) {
	    	  
	    	 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	      }
		}

	   @Override
	   public ResponseEntity<List<PlaceDTO>> getPlaceList(Integer placeSeq) {
	      
	      try {
	         List<Place> placeList = placeRepository.findAll();
	         
	         List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();
	      
	         for (Place place : placeList) {
	        	 
	            PlaceDTO placeDTO = PlaceDTO.toDTO(place);
	            
	            placeDTOList.add(placeDTO);
	         }
	         
	         return ResponseEntity.ok(placeDTOList);
	         
	      } catch (Exception e) {
	    	  
	    	 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	      }
	      
	   }


		@Override
		public ResponseEntity<PlaceDTO> getPlaceByPlaceSeq(int placeSeq) {
			try {
				Optional<Place> placeOptional = placeRepository.findById(placeSeq);
				
				Place place = placeOptional.orElseThrow();
				
				PlaceDTO placeDTO = PlaceDTO.toDTO(place);
				
				return ResponseEntity.ok(placeDTO);
				
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}

		
}
