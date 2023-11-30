package com.finalProject.togOther.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource("classpath:kakao/kakao.properties") // classpath: <= resources를 기준으로 파일을 찾는다
@Getter
@Setter
public class KakaoConfiguration {
	private @Value("${kakao.id}") String id;
	private @Value("${kakao.secret}") String secret;
	private @Value("${kakao.refreshToken}") String refreshToken;
}
