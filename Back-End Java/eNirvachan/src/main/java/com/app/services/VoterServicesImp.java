package com.app.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.PartyDAO;
import com.app.dao.VoterDAO;
import com.app.entities.Party;
import com.app.entities.Voter;

@Service
@Transactional
public class VoterServicesImp implements VoterServices {

	@Autowired
	private VoterDAO voterDao;
	@Autowired
	private PartyDAO partyDao;

	@Override
	public List<Voter> getAll() {
		List<Voter> votersList = voterDao.findAll();
		votersList = votersList.stream().sorted(Comparator.comparing(Voter::getStatus)).collect(Collectors.toList());
		return votersList;
	}

	@Override
	public String registerVoter(Voter v) {
		Voter temp = voterDao.save(v);
		if (temp == null)
			return null;
		return v.getVoter_id();
	}

	@Override
	public Voter getVoterById(String vid) {
		List<Voter> vList = voterDao.findAll();
		for (int i = 0; i < vList.size(); i++) {
			if (vList.get(i).getVoter_id().equals(vid))
				return vList.get(i);
		}
		return null;
	}

	@Override
	public boolean checkLogIn(String voterId, String password) {
		List<Voter> vList = voterDao.findAll();
		for (int i = 0; i < vList.size(); i++) {
			if (vList.get(i).getVoter_id().equals(voterId)) {
				return vList.get(i).getPassword().equals(password);
			}
		}
		return false;
	}

	@Override
	public boolean setStatus(String vid, String status) {
		List<Voter> vList = voterDao.findAll();
		for (int i = 0; i < vList.size(); i++) {
			if (vList.get(i).getVoter_id().equals(vid)) {
				vList.get(i).setStatus(status.toUpperCase());
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean joinParty(String partyName, String voterId) {
		List<Voter> voters = voterDao.findAll();
		int x = -1;
		for (int i = 0; i < voters.size(); i++) {
			if (voters.get(i).getVoter_id().equals(voterId)) {
				x = i;
				break;
			}
		}
		if (x == -1)
			return false;
		if (!voters.get(x).getParty().equals("None"))
			return false;

		List<Party> groups = partyDao.findAll();
		for (int i = 0; i < groups.size(); i++) {
			if (groups.get(i).getPartyFullName().equals(partyName)) {
				voters.get(x).setParty(partyName);
				return true;
			}
		}
		return false;
	}

	@Override
	public List<Voter> getCandidatesData(String pid) {
		List<Voter> candidates = new ArrayList<>();
		List<Voter> voters = voterDao.findAll();
		List<Party> groups = partyDao.findAll();
		String party = "";
		for (int i = 0; i < groups.size(); i++) {
			if (groups.get(i).getPartyId().equals(pid)) {
				party = groups.get(i).getPartyFullName();
				break;
			}
		}
		for (int i = 0; i < voters.size(); i++) {
			if (voters.get(i).getParty().equals(party))
				candidates.add(voters.get(i));
		}
		return candidates;
	}

	@Override
	public boolean selectCandidate(String vid, String pid) {
		List<Voter> voters = voterDao.findAll();
		boolean flag = false;
		List<Party> groups = partyDao.findAll();
		String party = "";
		for (int i = 0; i < groups.size(); i++) {
			if (groups.get(i).getPartyId().equals(pid)) {
				party = groups.get(i).getPartyFullName();
				break;
			}
		}
		for (int i = 0; i < voters.size(); i++) {
			if (voters.get(i).getVoter_id().equals(vid)) {
				voters.get(i).setCandidate("Selected");
				flag = true;
			} else {
				if (voters.get(i).getParty().equals(party)) {
					voters.get(i).setCandidate("Select");
					flag = true;
				}
			}
		}
		return flag;
	}

	@Override
	public List<Voter> getCandidates() {
		List<Voter> voters = voterDao.findAll();
		List<Voter> candidates = new ArrayList<>();
		for (int i = 0; i < voters.size(); i++) {
			if (voters.get(i).getCandidate().equals("Selected"))
				candidates.add(voters.get(i));
		}
		candidates = candidates.stream().sorted(Comparator.comparing(Voter::getVotes).reversed()).collect(Collectors.toList());
		return candidates;
	}

	@Override
	public boolean resetVotes() {
		List<Voter> voters = voterDao.findAll();
		for (int i = 0; i < voters.size(); i++) {
			voters.get(i).setVotes(0);
			voters.get(i).setVote_status("Not Voted");
		}
		return true;
	}

	@Override
	public boolean vote(String vid, String cid) {
		List<Voter> voters = voterDao.findAll();
		for (int i = 0; i < voters.size(); i++) {
			if (voters.get(i).getVoter_id().equals(vid)) {
				if (voters.get(i).getVote_status().equals("Voted"))
					return false;
				else {
					for (int j = 0; j < voters.size(); j++) {
						if (voters.get(j).getVoter_id().equals(cid)) {
							voters.get(j).setVotes(voters.get(j).getVotes() + 1);
						}
					}
					voters.get(i).setVote_status("Voted");
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public String getWinner() {
		List<Voter> voters = voterDao.findAll();
		long x = 0;
		int y = -1;
		for (int i = 0; i < voters.size(); i++) {
			if (x < voters.get(i).getVotes()) {
				x = voters.get(i).getVotes();
				y = i;
			}
		}
		return voters.get(y).getFirst_name() + " " + voters.get(y).getLast_name();
	}

}
