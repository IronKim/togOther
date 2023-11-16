package com.finalProject.togOther.main;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.MainDTO;

public interface MainService {
	public ResponseEntity<List<MainDTO>> getCity();

	public ResponseEntity<List<MainDTO>> getCountry();

	public ResponseEntity<List<MainDTO>> getRegion();

	public ResponseEntity<List<MainDTO>> getImage();


}
