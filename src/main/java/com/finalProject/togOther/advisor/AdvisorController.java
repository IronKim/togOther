package com.finalProject.togOther.advisor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.dto.TourPackageDetailDTO;
import com.finalProject.togOther.dto.UserDTO;

//관리자 컨트롤러
@RestController
@RequestMapping("api/advisor")
public class AdvisorController {

	private AdvisorService advisorService;

	public AdvisorController(AdvisorService advisorService) {
		this.advisorService = advisorService;
	}

	// 유저 수정
	@PutMapping(path = "updateUser/{userSeq}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable int userSeq, @RequestBody UserDTO userDTO) {
		return advisorService.updateUser(userSeq, userDTO);
	}

	// 유저 삭제
	@DeleteMapping(path = "deleteUserBy/{userEmail}")
	public ResponseEntity<String> deleteUserById(@PathVariable String userEmail) {
		return advisorService.deleteUserByEmail(userEmail);
	}

	// 유저 리스트 불러오기
	@GetMapping(path = "getUser")
	public ResponseEntity<List<UserDTO>> getUser() {
		return advisorService.getUser();
	}

	// 컬럼값으로 유저 리스트 불러오기
	@GetMapping(path = "getUserByColumn/{column}/{value}")
	public ResponseEntity<List<UserDTO>> getUserByColumn(@PathVariable String column, @PathVariable String value) {
		return advisorService.getUserByColumn(column, value);
	}

	// 아이디에 맞는 유저 불러오기
	@GetMapping(path = "getUser/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
		return advisorService.getUserById(id);
	}

	// 도시 추가
	@PostMapping(path = "addCity")
	public ResponseEntity<String> addCity(@RequestBody CityDTO cityDTO) {
		return advisorService.addCity(cityDTO);
	}

	// 도시 수정
	@PutMapping(path = "updateCity/{citySeq}")
	public ResponseEntity<CityDTO> updateCity(@PathVariable int citySeq, @RequestBody CityDTO cityDTO) {
		System.out.println(cityDTO.getCityName());
		System.out.println(cityDTO.getCountryName());
		return advisorService.updateCity(citySeq, cityDTO);
	}

	// 도시 삭제
	@DeleteMapping(path = "deleteCity/{seq}")
	public ResponseEntity<String> deleteCityBySeq(@PathVariable int seq) {
		return advisorService.deleteCityBySeq(seq);
	}

	// 도시 리스트 불러오기
	@GetMapping(path = "getCity")
	public ResponseEntity<List<CityDTO>> getCity() {
		return advisorService.getCity();
	}

	// Seq값에 따른 도시 불러오기
	@GetMapping(path = "getCity/{seq}")
	public ResponseEntity<CityDTO> getCityBySeq(@PathVariable int seq) {
		return advisorService.getCityBySeq(seq);
	}

	// 장소 추가
	@PostMapping(path = "addPlace")
	public ResponseEntity<String> addPlace(@RequestBody PlaceDTO placeDTO) {
		return advisorService.addPlace(placeDTO);
	}

	// 장소 수정
	@PutMapping(path = "updatePlace/{placeSeq}")
	public ResponseEntity<PlaceDTO> updatePlace(@PathVariable int placeSeq, @RequestBody PlaceDTO placeDTO) {
		return advisorService.updatePlace(placeSeq, placeDTO);
	}

	// 장소 삭제
	@DeleteMapping(path = "deletePlace/{seq}")
	public ResponseEntity<String> deletePlaceBySeq(@PathVariable int seq) {
		return advisorService.deletePlaceBySeq(seq);
	}

	// 장소 리스트 불러오기
	@GetMapping(path = "getPlace")
	public ResponseEntity<List<PlaceDTO>> getPlace() {
		return advisorService.getPlace();
	}

	// Seq값에 따른 장소 불러오기
	@GetMapping(path = "getPlace/{seq}")
	public ResponseEntity<PlaceDTO> getPlaceBySeq(@PathVariable int seq) {
		return advisorService.getPlaceBySeq(seq);
	}

	// citySeq값에 따른 장소 불러오기
	@GetMapping(path = "getPlaceByCitySeq/{citySeq}")
	public ResponseEntity<List<PlaceDTO>> getPlaceByCitySeq(@PathVariable int citySeq) {
		return advisorService.getPlaceByCitySeq(citySeq);
	}
	
	// 패키지 추가
	@PostMapping(path = "addPackage")
	public ResponseEntity<String> addPackage(@RequestBody TourPackageDTO tourPackageDTO) {
		return advisorService.addPackage(tourPackageDTO);
	}
	
	// 패키지 수정
	@PutMapping(path = "updatePackage/{tpSeq}")
	public ResponseEntity<TourPackageDTO> updatePackage(@PathVariable int tpSeq, @RequestBody TourPackageDTO tourPackageDTO) {
		return advisorService.updatePackage(tpSeq, tourPackageDTO);
	}
	
	// 패키지 삭제
	@DeleteMapping(path = "deletePackage/{tpSeq}")
	public ResponseEntity<String> deletePackageByTpSeq(@PathVariable int tpSeq) {
		return advisorService.deletePackageByTpSeq(tpSeq);
	}
	
	// 패키지 리스트 불러오기
	@GetMapping(path = "getPackage")
	public ResponseEntity<List<TourPackageDTO>> getPackage() {
		return advisorService.getPackage();
	}
	
	// citySeq값에 따른 패키지 불러오기
	@GetMapping(path = "getPackageByCitySeq/{citySeq}")
	public ResponseEntity<List<TourPackageDTO>> getPackageByCitySeq(@PathVariable int citySeq) {
		return advisorService.getPackageByCitySeq(citySeq);
	}
	
	// 상세 패키지 추가
	@PostMapping(path = "addPackageDetail")
	public ResponseEntity<String> addPackageDetail(@RequestBody TourPackageDetailDTO tourPackageDetailDTO) {
		return advisorService.addPackageDetail(tourPackageDetailDTO);
	}
	
	// 상세 패키지 수정
	@PutMapping(path = "updatePackageDetail/{tpdSeq}")
	public ResponseEntity<TourPackageDetailDTO> updatePackageDetail(@PathVariable int tpdSeq, @RequestBody TourPackageDetailDTO tourPackageDetailDTO) {
		return advisorService.updatePackageDetail(tpdSeq, tourPackageDetailDTO);
	}
	
	// 상세 패키지 삭제
	@DeleteMapping(path = "deletePackageDetailByTpSeq/{tpSeq}")
	public ResponseEntity<String> deletePackageDetailByTpSeq(@PathVariable int tpSeq) {
		return advisorService.deletePackageDetailByTpSeq(tpSeq);
	}
	
	// citySeq값에 따른 패키지 불러오기
	@GetMapping(path = "getPackageDetailByTpSeq/{tpSeq}")
	public ResponseEntity<TourPackageDetailDTO> getPackageDetailByTpSeq(@PathVariable int tpSeq) {
		return advisorService.getPackageDetailByTpSeq(tpSeq);
	}

}
