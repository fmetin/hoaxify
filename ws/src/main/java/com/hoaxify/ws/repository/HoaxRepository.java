package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.Hoax;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoaxRepository extends JpaRepository<Hoax, Long> {


}
