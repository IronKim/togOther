package com.finalProject.togOther.advisor;

import java.util.List;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.User;


public interface AdvisorService {
	
	public User addUser(User user);
	
	public User updateUser(User user);
	
	public void deleteUserById(String id);
	
	public List<User> getUser();
	
	public User getUserById(String id);
	
	
	
	
	public City addCity(City city);
	
	public City updateCity(City city);
	
	public void deleteCityBySeq(int seq);

	public List<City> getCity();
	
	public City getCityBySeq(int seq);
	
	
	
	
	
	
	
	public Place addPlace(Place place);

	public Place updatePlace(Place place);
	
	public void deletePlaceBySeq(int seq);
	
	public List<Place> getPlace();

	public Place getPlaceBySeq(int seq);

	public List<Place> getPlaceByCitySeq(int citySeq);

	

	

	

	
}
