package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
    long deleteByUsername(String username);
    long countByUsername(String username);
    User findByUsername(String username);
    Page<User> findByIdNot(long id, Pageable pageable);

    @Transactional
    @Modifying
    @Query("update User u set u.displayName = :displayName where u.username = :username")
    void updateDisplayNameByUsername(@Param("displayName") String displayName, @Param("username") String username);

}
