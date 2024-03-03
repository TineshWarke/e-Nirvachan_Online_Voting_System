<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<h2>Voter Registration</h2>
	<hr>
	<form action="/voter/register" method="post">
		<table>
			<tr>
				<td>First Name :</td>
				<td><input type="text" id="first_name" name="first_name"/></td>
			</tr>
			<tr>
				<td>Last Name :</td>
				<td><input type="text" id="last_name" name="last_name" /></td>
			</tr>
			<tr>
				<td>Date of Birth</td>
				<td><input type="date" id="dob" name="dob" /></td>
			</tr>
			<tr>
				<td>Gender</td>
				<td><select id="gender" name="gender">
						<option value="MALE">MALE</option>
						<option value="FEMALE">FEMALE</option>
				</select></td>
			</tr>
			<tr>
				<td>Email</td>
				<td><input type="email" id="email" name="email"/></td>
			</tr>
			<tr>
				<td>Password</td>
				<td><input type="password" id="password" name="password" /></td>
			</tr>
			<tr>
				<td>Mobile No</td>
				<td><input type="text" id="mobile_no" name="mobileno" maxlength="10" /></td>
			</tr>
			<tr>
				<td>Aadhar Number</td>
				<td><input type="text" id="aadhar_number" name="aadhar_number" maxlength="12" /></td>
			</tr>
			<tr>
				<td>Caste</td>
				<td><select id="caste" name="caste">
						<option value="OPEN">OPEN</option>
						<option value="OBC">OBC</option>
						<option value="SC">SC</option>
						<option value="ST">ST</option>
				</select></td>
			</tr>
			<tr>
				<td>Address</td>
				<td><input type="text" id="address" name="address" /></td>
			</tr>
			<tr>
				<td>City</td>
				<td><input type="text" id="city" name="city" /></td>
			</tr>
			<tr>
				<td>State</td>
				<td><input type="text" id="state" name="state" /></td>
			</tr>
			<tr>
				<td><button type="submit">Register</button></td>
				<td><button type="reset">Cancel</button></td>
			</tr>
		</table>
	</form>
</body>
</html>