package com.app.services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.PartyDAO;
import com.app.entities.Party;

@Service
@Transactional
public class PartyServicesImp implements PartyServices {
	@Autowired
	private PartyDAO partyDao;
	
	@Override
	public List<Party> getAll() {
		List<Party> partyList = partyDao.findAll();
		partyList = partyList.stream()
	      .sorted(Comparator.comparing(Party::getStatus))
	      .collect(Collectors.toList());
		return partyList;
	}
	
	@Override
	public String registerParty(Party p) {
		Party temp=partyDao.save(p);
		if(temp==null)
			return null;
		return p.getPartyId();
	}

	@Override
	public boolean setStatus(String pid, String status) {
		List<Party> pList = partyDao.findAll();
		for(int i=0; i < pList.size(); i++) {
			if(pList.get(i).getPartyId().equals(pid)){
				pList.get(i).setStatus(status.toUpperCase());
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean checkLogIn(String partyId, String password) {
		List<Party> pList = partyDao.findAll();
		for (int i = 0; i < pList.size(); i++) {
			if (pList.get(i).getPartyId().equals(partyId)) {
				return pList.get(i).getPassword().equals(password);
			}
		}
		return false;
	}

	@Override
	public Party getPartyById(String pid) {
		List<Party> partys = partyDao.findAll();
		for(int i=0; i < partys.size(); i++) {
			if(partys.get(i).getPartyId().equals(pid))
				return partys.get(i);
		}
		return null;
	}
}
