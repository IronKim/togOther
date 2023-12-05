package com.finalProject.togOther.kakao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.config.KakaoConfiguration;
import com.finalProject.togOther.user.UserService;


//플래너 컨트롤러
@RestController
@RequestMapping("api/kakao")
public class KakaoController {
	private String id;
	private String secret;
	
	private UserService userService;
	
	public KakaoController(KakaoConfiguration kakaoConfiguration,UserService userService) {
		id = kakaoConfiguration.getId();
		secret = kakaoConfiguration.getSecret();
		this.userService = userService;
	}
			
	@Autowired
    CustomMessageService customMessageService;
	@Autowired
	GetToken getToken;
	
	@PostMapping(path = "send")
	public void serviceStart(@RequestBody Map<String, String> requestBody) {
		String text = requestBody.get("text");
		String link = requestBody.get("link");
		String refreshToken = userService.kakaoRefreshTokenGet();
		String token = getToken.refreshAccessToken(refreshToken, id, secret);
		customMessageService.sendMessage(token,text,link);//토큰 넣는곳
	}
	
	@GetMapping(path = "token/{token}")
	public String tokenCreate(@PathVariable String token) {
		return getToken.Token(token,id,secret);
	}
}
