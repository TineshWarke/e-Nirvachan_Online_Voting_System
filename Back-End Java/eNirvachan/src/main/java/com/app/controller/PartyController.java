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

import com.app.entities.Party;
import com.app.services.PartyServices;

@RestController
@RequestMapping("/party")
@CrossOrigin(origins = "http://localhost:3000")
public class PartyController {
	@Autowired
	private PartyServices partyServices;

	public PartyController() {
		System.out.println("Inside Party Controller Constructor " + getClass());
	}

	@GetMapping("/partylist")
	public ResponseEntity<List<Party>> partyList() {
		System.out.println("Inside Party List Function GetMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(partyServices.getAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
	}

	@GetMapping("/id/{pid}")
	public Party getPartyById(@PathVariable String pid) {
		System.out.println("Inside Get Party By Id Function GetMapping");
		return partyServices.getPartyById(pid);
	}

	@PostMapping("/register")
	public ResponseEntity<String> voterRegistration(@RequestBody String[] data) {
		System.out.println("Inside Party Register Function PostMapping");
		try {
			Party p = new Party(data[0], data[1], data[2], data[3], data[4].getBytes());
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyServices.registerParty(p));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Party Registertion Failed " + e);
		}
	}

	@PutMapping("/status")
	public ResponseEntity<Boolean> setStatus(@RequestBody String[] data) {
		System.out.println("Inside Set Status Function PutMapping");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(partyServices.setStatus(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Boolean> checkLogIn(@RequestBody String[] data) {
		System.out.println("Inside Check LogIn Function PostMapping");
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyServices.checkLogIn(data[0], data[1]));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
		}
	}
}
