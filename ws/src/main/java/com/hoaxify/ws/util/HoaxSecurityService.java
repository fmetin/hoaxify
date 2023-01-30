package com.hoaxify.ws.util;

import com.hoaxify.ws.entity.Hoax;
import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.repository.HoaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "hoaxSecurity")
public class HoaxSecurityService {

    private final HoaxRepository hoaxRepository;

    @Autowired
    public HoaxSecurityService(HoaxRepository hoaxRepository) {
        this.hoaxRepository = hoaxRepository;
    }

    public boolean isAllowedToDelete(long id, User loggedInUser) {
        Optional<Hoax> optionalHoax = hoaxRepository.findById(id);
        if (optionalHoax.isEmpty())
            return false;
        Hoax hoax = optionalHoax.get();
        return hoax.getUser().getId() == loggedInUser.getId();
    }
}
