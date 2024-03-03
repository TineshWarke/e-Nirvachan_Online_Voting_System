package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Admin_Data")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Admins extends BaseEntity {

	@Column(name = "admim_id", nullable = false, unique = true)
	private String admin_id;
	@Column(name = "admin_name", nullable = false)
	private String admin_name;
	@Column(name = "admin_email", nullable = false, unique = true)
	private String admin_email;
	@Column(name = "mobileno", nullable = false, unique = true, length = 10)
	private String mobile_no;
	@Column(name = "password", nullable = false)
	private String password;
	@Column(name = "adminRole", nullable = false)
	@Enumerated(EnumType.STRING)
	private AdminRoles adminRole;
	@Column(name = "join_Date", nullable = false)
	private LocalDate joinigDate;

}
