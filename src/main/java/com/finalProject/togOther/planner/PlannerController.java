package com.finalProject.togOther.planner;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;

//플래너 컨트롤러
@RestController
@RequestMapping("api/planner")
public class PlannerController {
	
	private PlannerService plannerService;
	
	public PlannerController(PlannerService plannerService) {
		this.plannerService = plannerService;
	}
	
	@PostMapping(path= "addPlanner")
	public int addPlanner(@RequestBody PlannerDTO plannerDTO) {
		return plannerService.addPlanner(plannerDTO);
	}
	
	@PostMapping(path= "addSubItem")
	public ResponseEntity<String> addSubItem(@RequestBody SubItemDTO subItemDTO) {
		return plannerService.addSubItem(subItemDTO);
	}
	
	@PostMapping(path= "addPlannerText")
	public ResponseEntity<String> addPlannerText(@RequestBody PlannerTextDTO plannerTextDTO) {
		return plannerService.addPlannerText(plannerTextDTO);
	}
	
	@PostMapping(path= "addPlannerImage")
	public ResponseEntity<String> addPlannerImage(@RequestBody PlannerImageDTO plannerImageDTO) {
		return plannerService.addPlannerImage(plannerImageDTO);
	}
//	//도시 추가
//	@PostMapping(path= "addCity")
//	public ResponseEntity<String> addCity(@RequestBody CityDTO cityDTO) {
//		return advisorService.addCity(cityDTO);
//	}
//	//유저 수정
//	@PutMapping(path= "updateUser/{userSeq}")
//	public ResponseEntity<UserDTO> updateUser(@PathVariable int userSeq, @RequestBody UserDTO userDTO) {
//		return advisorService.updateUser(userSeq,userDTO);
//	}
//	
//	//유저 삭제
//	@DeleteMapping(path = "deleteUserBy/{userEmail}")
//	public ResponseEntity<String> deleteUserById(@PathVariable String userEmail) {
//		return advisorService.deleteUserByEmail(userEmail);
//	}
//	
//	//유저 리스트 불러오기
//	@GetMapping(path= "getUser")
//	public ResponseEntity<List<UserDTO>> getUser() {
//		return advisorService.getUser();
//	}
//	
//	//아이디에 맞는 유저 불러오기
//	@GetMapping(path= "getUser/{id}")
//	public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
//		return advisorService.getUserById(id);
//	}
//	
//	
//	//도시 수정
//	@PutMapping(path= "updateCity/{citySeq}")
//	public ResponseEntity<CityDTO> updateCity(@PathVariable int citySeq, @RequestBody CityDTO cityDTO) {
//		System.out.println(cityDTO.getCityName());
//		System.out.println(cityDTO.getCountryName());
//		return advisorService.updateCity(citySeq, cityDTO);
//	}
//	
//	//도시 삭제
//	@DeleteMapping(path = "deleteCity/{seq}")
//	public ResponseEntity<String> deleteCityBySeq(@PathVariable int seq) {
//		return advisorService.deleteCityBySeq(seq);
//	}
//	
//	//도시 리스트 불러오기
//	@GetMapping(path= "getCity")
//	public ResponseEntity<List<CityDTO>> getCity() {
//		return advisorService.getCity();
//	}
//	
//	//Seq값에 따른 도시 불러오기 
//	@GetMapping(path = "getCity/{seq}")
//	public ResponseEntity<CityDTO> getCityBySeq(@PathVariable int seq) {
//		return advisorService.getCityBySeq(seq);
//	}
//	
//	//장소 추가
//	@PostMapping(path ="addPlace")
//	public ResponseEntity<String> addPlace(@RequestBody PlaceDTO placeDTO) {
//		return advisorService.addPlace(placeDTO);
//	}
//	
//	//장소 수정
//	@PutMapping(path= "updatePlace/{placeSeq}")
//	public ResponseEntity<PlaceDTO> updatePlace(@PathVariable int placeSeq, @RequestBody PlaceDTO placeDTO) {
//		return advisorService.updatePlace(placeSeq, placeDTO);
//	}
//	
//	//장소 삭제
//	@DeleteMapping(path = "deletePlace/{seq}")
//	public ResponseEntity<String> deletePlaceBySeq(@PathVariable int seq) {
//		return advisorService.deletePlaceBySeq(seq);
//	}
//	
//	//장소 리스트 불러오기
//	@GetMapping(path ="getPlace")
//	public ResponseEntity<List<PlaceDTO>> getPlace() {
//		return advisorService.getPlace();
//	}
//	
//	//Seq값에 따른 장소 불러오기 
//	@GetMapping(path = "getPlace/{seq}")
//	public ResponseEntity<PlaceDTO> getPlaceBySeq(@PathVariable int seq) {
//		return advisorService.getPlaceBySeq(seq);
//	}
//	
//	//citySeq값에 따른 장소 불러오기
//	@GetMapping(path = "getPlaceByCitySeq/{citySeq}")
//	public ResponseEntity<List<PlaceDTO>> getPlaceByCitySeq(@PathVariable int citySeq) {
//		return advisorService.getPlaceByCitySeq(citySeq);
//	}
//	
	
}
