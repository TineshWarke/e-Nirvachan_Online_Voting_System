package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="candidate_data")
public class Candidates extends BaseEntity {

	@Column(name="candidate_id",nullable = false,unique = true)
	private String candidate_id;
	@Column(name="candidate_name",nullable = false)
	private String candidate_name;
	//Relation
	@Column(name="party_name",nullable = false)
//	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
//	private Party party_name;
	private String party_name;
	
	
	
}