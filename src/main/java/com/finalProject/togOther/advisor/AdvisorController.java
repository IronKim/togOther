package com.finalProject.togOther.advisor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.CityDTO;

//관리자 컨트롤러
@RestController
@RequestMapping("api/advisor")
public class AdvisorController {
	
	private AdvisorService advisorService;
	
	public AdvisorController(AdvisorService advisorService) {
		super();
		this.advisorService = advisorService;
	}
	
	//유저 추가
	@PostMapping(path= "addUser")
	public User addUser(@RequestBody User user) {
		return advisorService.addUser(user);
	}
	
	//유저 수정
	@PutMapping(path= "updateUser")
	public User updateUser(@RequestBody User user) {
		return advisorService.updateUser(user);
	}
	
	//유저 삭제
	@DeleteMapping(path = "deleteUser/{id}")
	public void deleteUserById(@PathVariable String id) {
		advisorService.deleteUserById(id);
	}
	
	//유저 리스트 불러오기
	@GetMapping(path= "getUser")
	public List<User> getUser() {
		return advisorService.getUser();
	}
	
	//아이디에 맞는 유저 불러오기
	@GetMapping(path= "getUser/{id}")
	public User getUserById(@PathVariable String id) {
		return advisorService.getUserById(id);
	}
	
	//도시 추가
	@PostMapping(path= "addCity")
	public City addCity(@RequestBody City city) {
		return advisorService.addCity(city);
	}
	
	//도시 수정
	@PutMapping(path= "updateCity")
	public City updateCity(@RequestBody City city) {
		return advisorService.updateCity(city);
	}
	
	//도시 삭제
	@DeleteMapping(path = "deleteCity/{seq}")
	public void deleteCityBySeq(@PathVariable int seq) {
		advisorService.deleteCityBySeq(seq);
	}
	
	//도시 리스트 불러오기
	@GetMapping(path= "getCity")
	public List<City> getCity() {
		return advisorService.getCity();
	}
	
	//Seq값에 따른 도시 불러오기 
	@GetMapping(path = "getCity/{seq}")
	public City getCityBySeq(@PathVariable int seq) {
		return advisorService.getCityBySeq(seq);
	}
	
	//장소 추가
	@PostMapping(path ="addPlace")
	public Place addPlace(@RequestBody Place place) {
		return advisorService.addPlace(place);
	}
	
	//장소 수정
	@PutMapping(path= "updatePlace")
	public Place updatePlace(@RequestBody Place place) {
		return advisorService.updatePlace(place);
	}
	
	//장소 삭제
	@DeleteMapping(path = "deletePlace/{seq}")
	public void deletePlaceBySeq(@PathVariable int seq) {
		advisorService.deletePlaceBySeq(seq);
	}
	
	//장소 리스트 불러오기
	@GetMapping(path ="getPlace")
	public List<Place> getPlace() {
		return advisorService.getPlace();
	}
	
	//Seq값에 따른 장소 불러오기 
	@GetMapping(path = "getPlace/{seq}")
	public Place getPlaceBySeq(@PathVariable int seq) {
		return advisorService.getPlaceBySeq(seq);
	}
	
	//citySeq값에 따른 장소 불러오기
	@GetMapping(path = "getPlaceByCitySeq/{citySeq}")
	public List<Place> getPlaceByCitySeq(@PathVariable int citySeq) {
		return advisorService.getPlaceByCitySeq(citySeq);
	}
	
	
}
