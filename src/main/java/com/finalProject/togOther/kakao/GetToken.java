package com.finalProject.togOther.kakao;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;


import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
public class GetToken {
	
	public String Token(String code, String id, String secret) {
		try{
	        RestTemplate restTemplate = new RestTemplate();

	        //HttpHeader 오브젝트 생성
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

	        //HttpBody 오브젝트 생성
	        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	        params.add("grant_type","authorization_code");
	        params.add("client_id",id);
	        params.add("client_secret",secret);
	        params.add("redirect_uri","http://localhost:3000/token");
	        params.add("code",code);

	        //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
	        HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

	        //Http 요청하기 (POST 방식으로)
	        ResponseEntity<String> response = restTemplate.exchange(
	                "https://kauth.kakao.com/oauth/token",
	                HttpMethod.POST,
	                kakaoTokenRequest,
	                String.class
	        );
	        
	        int startIndex = response.getBody().indexOf("\"refresh_token\":\"") + 17;
	        int endIndex = response.getBody().indexOf("\"", startIndex);
	        
	        String token = response.getBody().substring(startIndex, endIndex);
	        
	        System.out.println(token);
	        
	        updateToken(token);
	        
	        return token;
	    } catch (Exception e) {
	        return null;
	    }
	}
	public void updateToken(String token) {
	        try {
	            // Resource 객체를 사용하여 클래스패스 내의 리소스를 로드합니다.
	            Resource resource = new ClassPathResource("kakao/kakao.properties");

	            // 리소스를 읽어옵니다.
	            InputStream inputStream = resource.getInputStream();
	            byte[] bytes = FileCopyUtils.copyToByteArray(inputStream);
	            inputStream.close();

	            // 읽어온 내용을 문자열로 변환합니다.
	            String fileContent = new String(bytes, "UTF-8");
	            System.out.println(fileContent);
	            // 입력받은 문장을 업데이트된 파일 내용으로 변경합니다.
	            fileContent = fileContent.replaceAll("kakao.refreshToken=.*", "kakao.refreshToken=" + token);

	            // 파일을 업데이트합니다.
	            BufferedWriter writer = new BufferedWriter(new FileWriter(resource.getFile()));
	            writer.write(fileContent);
	            writer.close();

	            System.out.println("토큰이 성공적으로 업데이트되었습니다.");
	        } catch (IOException e) {
	            System.err.println("토큰을 업데이트하는 중 오류가 발생했습니다: " + e.getMessage());
	        }
	}
	
	public String refreshAccessToken(String refreshToken,String id,String secret) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "refresh_token");
		params.add("client_id", id);
		params.add("client_secret", secret);
		params.add("refresh_token", refreshToken);

		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

		ResponseEntity<String> response = restTemplate.exchange(
		        "https://kauth.kakao.com/oauth/token",
		        HttpMethod.POST,
		        kakaoTokenRequest,
		        String.class
		);

		int responseCode = response.getStatusCodeValue();

		if (responseCode == HttpStatus.OK.value()) {
		    String responseBody = response.getBody();
		    JSONObject json = new JSONObject(responseBody);
		    String newAccessToken = json.getString("access_token");
		    System.out.println(newAccessToken);
		    return newAccessToken;
		} else {
			return null;
		}
	}
}
