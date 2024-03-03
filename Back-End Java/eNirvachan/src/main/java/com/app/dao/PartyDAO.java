package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entities.Party;

public interface PartyDAO extends JpaRepository<Party, Long> {

}
