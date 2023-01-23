package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.Hoax;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoaxRepository extends JpaRepository<Hoax, Long> {
    Page<Hoax> findByIdLessThan(long id, Pageable pageable);
    Page<Hoax> findByUser_Id(long id, Pageable pageable);

    Page<Hoax> findByUser_Username(String username, Pageable pageable);


}
