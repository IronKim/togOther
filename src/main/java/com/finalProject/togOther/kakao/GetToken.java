package com.finalProject.togOther.kakao;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.finalProject.togOther.user.UserService;


@Service
public class GetToken {
	
	private UserService userService;

	public GetToken(UserService userService) {
		this.userService = userService;
	}
	
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
	        params.add("redirect_uri","http://www.togother.kro.kr/token");
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
	        
	        userService.kakaoRefreshTokenUpdate(token);
	        
	        return token;
	    } catch (Exception e) {
	        return null;
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
