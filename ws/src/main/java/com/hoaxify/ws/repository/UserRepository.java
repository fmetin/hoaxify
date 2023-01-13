package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    long countByUsername(String username);
    User findByUsername(String username);
    Page<User> findByIdNot(long id, Pageable pageable);




}
