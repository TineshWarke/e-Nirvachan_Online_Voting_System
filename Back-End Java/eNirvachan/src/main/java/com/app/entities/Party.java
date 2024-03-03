package com.app.entities;

import java.time.LocalDate;
import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "party_data")
public class Party extends BaseEntity {
	@Column(name = "party_id", nullable = false)
	private String partyId;
	@Column(name = "party_full_name", nullable = false)
	private String partyFullName;
	@Column(name = "party_leader", nullable = false)
	private String partyLeader;
	@Column(name = "party_reagion", nullable = false)
	private String partyRegion;
	@Column(name = "formation_day", nullable = false)
	private LocalDate formationDay;
	@Column(name = "password")
	private String password;
	@Column(name = "status")
	@Enumerated(value = EnumType.STRING)
	private ProfileStatus status;
	@Lob
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] symbol;

	public Party() {
		super();
	}

	public Party(String partyFullName, String partyLeader, String partyRegion, String password, byte[] symbol) {
		super();
		Random random = new Random();
		this.partyId = "PPID" + String.format("%03d", LocalDate.now().getDayOfYear())
				+ String.format("%05d", random.nextInt(98999) + 1000);
		this.partyFullName = partyFullName;
		this.partyLeader = partyLeader;
		this.partyRegion = partyRegion;
		this.formationDay = LocalDate.now();
		this.password = password;
		this.status = ProfileStatus.PENDING;
		this.symbol = symbol;
	}

	public String getPartyId() {
		return partyId;
	}

	public String getPartyFullName() {
		return partyFullName;
	}

	public String getPartyLeader() {
		return partyLeader;
	}

	public String getPartyRegion() {
		return partyRegion;
	}

	public LocalDate getFormationDay() {
		return formationDay;
	}

	public String getPassword() {
		return password;
	}

	public void setPartyFullName(String partyFullName) {
		this.partyFullName = partyFullName;
	}

	public void setPartyLeader(String partyLeader) {
		this.partyLeader = partyLeader;
	}

	public void setPartyRegion(String partyRegion) {
		this.partyRegion = partyRegion;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ProfileStatus getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = ProfileStatus.valueOf(status);
	}

	@Override
	public String toString() {
		return "Party [partyId=" + partyId + ", partyFullName=" + partyFullName + ", partyLeader=" + partyLeader
				+ ", partyRegion=" + partyRegion + ", formationDay=" + formationDay + ", password=" + password + "]";
	}

}
