package com.finalProject.togOther.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource("classpath:storage/naver.properties") // classpath: <= resources를 기준으로 파일을 찾는다
@Getter
@Setter
public class NaverConfiguration {
	private @Value("${ncp.accessKey}") String accessKey;
	private @Value("${ncp.secretKey}") String secretKey;
	private @Value("${ncp.regionName}") String regionName;
	private @Value("${ncp.endPoint}") String endPoint;
}
