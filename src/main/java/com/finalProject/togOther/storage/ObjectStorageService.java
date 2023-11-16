package com.finalProject.togOther.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ObjectStorageService {

	public String uploadFile(String bucketName, String string, MultipartFile img);

}
