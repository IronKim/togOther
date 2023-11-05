package com.finalProject.togOther.advisor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.repository.CityRepository;
import com.finalProject.togOther.repository.PlaceRepository;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdvisorServiceImpl implements AdvisorService {

	private	CityRepository cityDAO;
	
	private PlaceRepository placeDAO;
	
	private UserRepository userDAO;
	
	public AdvisorServiceImpl(CityRepository cityDAO, PlaceRepository placeDAO, UserRepository userDAO) {
		super();
		this.cityDAO = cityDAO;
		this.placeDAO = placeDAO;
		this.userDAO = userDAO;
	}
	
	@Override
	public User addUser(User user) {
		return userDAO.save(user);
	}
	
	@Override
	public User updateUser(User user) {
		return userDAO.save(user);
	}
	
	@Override
	public void deleteUserById(String id) {
		userDAO.deleteById(id);
	}

	@Override
	public List<User> getUser() {
		return userDAO.findAll();
	}
	
	@Override
	public User getUserById(String id) {
		return userDAO.findById(id).get();
	}

	@Override
	public City addCity(City city) {
		return cityDAO.save(city);
	}
	
	@Override
	public City updateCity(City city) {
		return cityDAO.save(city);
	}
	
	@Override
	public void deleteCityBySeq(int seq) {
		cityDAO.deleteById(seq);
	}
	
	@Override
	public List<City> getCity() {
		return cityDAO.findAll();
	}
	
	@Override
	public City getCityBySeq(int seq) {
		return cityDAO.findById(seq).get();
	}

	@Override
	public Place addPlace(Place place) {
		return placeDAO.save(place);
	}
	
	@Override
	public Place updatePlace(Place place) {
		return placeDAO.save(place);
	}
	
	@Override
	public void deletePlaceBySeq(int seq) {
		placeDAO.deleteById(seq);
	}

	@Override
	public List<Place> getPlace() {
		return placeDAO.findAll();
	}

	@Override
	public Place getPlaceBySeq(int seq) {
		return placeDAO.findById(seq).get();
	}

	@Override
	public List<Place> getPlaceByCitySeq(int citySeq) {
		return placeDAO.findByCitySeq(citySeq);
	}
	

}
