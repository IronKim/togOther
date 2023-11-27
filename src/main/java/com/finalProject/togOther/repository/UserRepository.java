package com.finalProject.togOther.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.finalProject.togOther.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public void deleteById(String id);

	public void deleteByEmail(String email);

	public Optional<User> findByEmail(String userEmail);

	@Query(value = "select user from User user where user.email like concat('%', ?1, '%')")
	public List<User> findListByEmail(String value);

	@Query(value = "select user from User user where user.name like concat('%', ?1, '%')")
	public List<User> findListByName(String value);

	public Optional<User> findByPhone(String phone);
}
