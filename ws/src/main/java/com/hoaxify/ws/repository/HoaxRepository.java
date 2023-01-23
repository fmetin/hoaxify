package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.Hoax;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoaxRepository extends JpaRepository<Hoax, Long> {
    Page<Hoax> findByIdLessThanAndUser_Username(long id, String username, Pageable pageable);
    Page<Hoax> findByIdLessThan(long id, Pageable pageable);
    List<Hoax> findByIdGreaterThan(long id, Sort sort);
    List<Hoax> findByIdGreaterThanAndUser_Username(long id, String username, Sort sort);
    long countByIdGreaterThan(long id);
    long countByIdGreaterThanAndUser_Username(long id, String username);
    Page<Hoax> findByUser_Id(long id, Pageable pageable);
    Page<Hoax> findByUser_Username(String username, Pageable pageable);


}
