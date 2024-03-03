package com.app.services;

import java.util.List;

import com.app.entities.Party;

public interface PartyServices {

	List<Party> getAll();

	String registerParty(Party p);
	
	boolean checkLogIn(String partyId, String password);

	boolean setStatus(String pid, String status);

	Party getPartyById(String pid);
	
}
