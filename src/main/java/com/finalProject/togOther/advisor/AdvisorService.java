package com.finalProject.togOther.advisor;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.dto.UserDTO;

public interface AdvisorService {

	public ResponseEntity<UserDTO> updateUser(int userSeq, UserDTO userDTO);

	public ResponseEntity<String> deleteUserByEmail(String userEmail);

	public ResponseEntity<List<UserDTO>> getUser();

	public ResponseEntity<List<UserDTO>> getUserByColumn(String column, String value);

	public ResponseEntity<UserDTO> getUserByEmail(String email);

	public ResponseEntity<String> addCity(CityDTO cityDTO);

	public ResponseEntity<CityDTO> updateCity(int citySeq, CityDTO cityDTO);

	public ResponseEntity<String> deleteCityBySeq(int seq);

	public ResponseEntity<List<CityDTO>> getCity();

	public ResponseEntity<CityDTO> getCityBySeq(int seq);

	public ResponseEntity<String> addPlace(PlaceDTO placeDTO);

	public ResponseEntity<PlaceDTO> updatePlace(int placeSeq, PlaceDTO placeDTO);

	public ResponseEntity<String> deletePlaceBySeq(int seq);

	public ResponseEntity<List<PlaceDTO>> getPlace();

	public ResponseEntity<PlaceDTO> getPlaceBySeq(int seq);

	public ResponseEntity<List<PlaceDTO>> getPlaceByCitySeq(int citySeq);

	public ResponseEntity<String> addTourPackage(TourPackageDTO tourPackageDTO);

	public ResponseEntity<TourPackageDTO> updateTourPackage(int tpSeq, TourPackageDTO tourPackageDTO);

	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq);

}
