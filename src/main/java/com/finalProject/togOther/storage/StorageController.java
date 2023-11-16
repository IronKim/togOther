package com.finalProject.togOther.storage;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.finalProject.togOther.dto.UserImageDTO;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("api/storage")
public class StorageController {
	
	@Autowired
	private ObjectStorageService objectStorageService;
	
	private String bucketName = "bitcamp-edu-bucket-97";
	
	// MappingJackson2HttpMessageConverter 가 jackson 라이브러리를 이용해
    // 자바 객체를 JSON 문자열로 변환하여 클라이언트로 보낸다.
    // 이 컨버터를 사용하면 굳이 UTF-8 변환을 설정할 필요가 없다.
    // 즉 produces = "application/json;charset=UTF-8" 를 설정하지 않아도 된다.
	@PostMapping(path="upload")
	public String upload(@ModelAttribute UserImageDTO userImageDTO,
							@RequestPart("files") List<MultipartFile> list,
							HttpSession session) {
		
		String links = "";
		
		for(int i = 0; i < list.size();i++) {
			links += "https://kr.object.ncloudstorage.com/"+bucketName+"/storage/" + 
						objectStorageService.uploadFile(bucketName,"storage/", list.get(i));
			if (i != (list.size()-1)) links += ",";
		}
		
		return links;
	}
}
