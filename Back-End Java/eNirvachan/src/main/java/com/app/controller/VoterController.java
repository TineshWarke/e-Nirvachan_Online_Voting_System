package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Voter;
import com.app.services.VoterServices;

@RestController
@RequestMapping("/voters")
@CrossOrigin(origins = "http://localhost:3000")
public class VoterController {

	@Autowired
	private VoterServices voterServices;

	public VoterController() {
		System.out.println("Inside Voter Controller Constructor " + getClass());
	}

	@GetMapping("/voterslist")
	public ResponseEntity<List<Voter>> votersList() {
		System.out.println("Inside Voter List Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.getAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<String> voterRegistration(@RequestBody String[] data) {
		System.out.println("Inside Voter Register Function PostMapping");

		try {
			Voter v = new Voter(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8],
					data[9], data[10], data[11], data[12].getBytes());

			return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterServices.registerVoter(v));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Voter Registertion Failed " + e);
		}
	}

	@GetMapping("/id/{vid}")
	public ResponseEntity<Voter> getVoterById(@PathVariable String vid) {
		System.out.println("Inside Get Voter By Id Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.getVoterById(vid));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@PutMapping("/status")
	public ResponseEntity<Boolean> setStatus(@RequestBody String[] data) {
		System.out.println("Inside Set Status Function PutMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.setStatus(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Boolean> checkLogIn(@RequestBody String[] data) {
		System.out.println("Inside Check LogIn Function PostMapping");
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterServices.checkLogIn(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
		}
	}

	@PostMapping("/joinparty")
	public ResponseEntity<Boolean> joinParty(@RequestBody String[] data) {
		System.out.println("Inside Join Party Function PostMapping");
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterServices.joinParty(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
		}
	}

	@GetMapping("/candidateslist/{pid}")
	public ResponseEntity<List<Voter>> candidatesList(@PathVariable String pid) {
		System.out.println("Inside Candidates List Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.getCandidatesData(pid));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@PutMapping("/selectcandidate")
	public ResponseEntity<Boolean> selectCandidates(@RequestBody String[] data) {
		System.out.println("Inside Select Candidates Function PutMapping");
		try {
			return ResponseEntity.status(HttpStatus.FOUND).body(voterServices.selectCandidate(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
		}
	}

	@GetMapping("/candidates")
	public ResponseEntity<List<Voter>> getCandidates() {
		System.out.println("Inside Get Candidates Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.getCandidates());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@PutMapping("/resetvotes")
	public ResponseEntity<Boolean> resetVotes() {
		System.out.println("Inside Reset Votes Function PutMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.resetVotes());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
		}
	}

	@PutMapping("/vote")
	public ResponseEntity<Boolean> vote(@RequestBody String[] data) {
		System.out.println("Inside Vote Function PutMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.vote(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(false);
		}
	}
	
	@GetMapping("/winner")
	public ResponseEntity<String> getWinner() {
		System.out.println("Inside Get Winner Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(voterServices.getWinner());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Election Pending");
		}
	}
}
