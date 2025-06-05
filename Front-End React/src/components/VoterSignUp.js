import 'bootstrap/dist/css/bootstrap.min.css';
import { signUp } from '../Services/VoterServiceJava';
import './css/votersignup.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const VoterSignUp = () => {
    const [voterDetails, setVoterDetails] = useState({
        first_name: '', last_name: '', password: '', gender: '', dob: '', address: '', city: '',
        state: '', mobileno: '', email: '', aadhar_number: '', caste: '', repass: '', img: null
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        setVoterDetails({ ...voterDetails, [name]: value });
    }

    const navigate = useNavigate();
    const cancel = () => {
        navigate('/');
    }

    const vsr = useRef();
    const saveVoter = (event) => {
        event.preventDefault();
        if (voterDetails.aadhar_number.length !== 12) {
            alert("Check your Aadhar number..!!")
        }

        else if (voterDetails.password != voterDetails.repass) {
            alert("Password dosen't match..!!");
        }
        else {
            signUp(voterDetails)
                .then((response) => {
                    console.log('Voter added successfully', response.data);
                    vsr.current.style.color = 'green';
                    vsr.current.innerText = 'Your Voter Id : ' + response.data;
                })
                .catch((error) => {
                    console.log('something went wroing' + error.response);
                    vsr.current.style.color = 'red';
                    vsr.current.innerText = 'Voter Registration Failed......';
                });
        }
    }

    return (
        <div className="sign">
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <form class="was-validated">
                <div className='signupform' id='vs1'>
                    <div id='heading'>
                        <h1>Voter Details</h1>
                    </div>
                    <div class="mb-3" id='fname'>
                        <label for="fname1">First Name</label>
                        <input type='text' class="form-control is-invalid" id="fname1" name='first_name' onChange={handleChange} value={voterDetails.first_name} placeholder="Enter Your First Name..." required />
                    </div>

                    <div class="mb-3" id='lname'>
                        <label for="lname1">Last Name</label>
                        <input type='text' class="form-control is-invalid" id="lname1" name='last_name' value={voterDetails.last_name} onChange={handleChange} placeholder="Enter Your Last Name..." required />
                    </div>

                    <div class="mb-3" id='dobdiv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for='dob'>Date of Birth</label>
                            </div>
                            <input type="date" class="form-control is-invalid" id='dob' name='dob' value={voterDetails.dob} onChange={handleChange} aria-describedby="validatedInputGroupPrepend" required />
                        </div>
                    </div>

                    <div class="mb-3" id='gendiv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend" id='gen'>
                                <label class="input-group-text" for="gender">Gender</label>
                            </div>
                            <select class="custom-select" id='gender' name='gender' value={voterDetails.gender} onChange={handleChange} required>
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3" id='castediv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend" id='ca'>
                                <label class="input-group-text" for="caste">Caste</label>
                            </div>
                            <select class="custom-select" id='caste' name='caste' value={voterDetails.caste} onChange={handleChange} required>
                                <option value="">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3" id='statediv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend" id='ca'>
                                <label class="input-group-text" for="state">State</label>
                            </div>
                            <select class="custom-select" id='state' name='state' value={voterDetails.state} onChange={handleChange} required>
                                <option value="">Choose...</option>     <option value="JAMMU AND KASHMIR">JAMMU AND KASHMIR</option>            <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>      <option value="PUNJAB">PUNJAB</option>
                                <option value="CHANDIGARH">CHANDIGARH</option>      <option value="UTTARAKHAND">UTTARAKHAND</option>        <option value="HARYANA">HARYANA</option>        <option value="DELHI">DELHI</option>
                                <option value="RAJASTHAN">RAJASTHAN</option>        <option value="UTTAR PRADESH">UTTAR PRADESH</option>        <option value="BIHAR">BIHAR</option>        <option value="SIKKIM">SIKKIM</option>
                                <option value="ARUNACHAL PRADESH">ARUNACHAL PRADESH</option>        <option value="NAGALAND">NAGALAND</option>      <option value="MANIPUR">MANIPUR</option>        <option value="MIZORAM">MIZORAM</option>
                                <option value="TRIPURA">TRIPURA</option>        <option value="MEGHALAYA">MEGHALAYA</option>        <option value="ASSAM">ASSAM</option>        <option value="WEST BENGAL">WEST BENGAL</option>
                                <option value="JHARKHAND">JHARKHAND</option>        <option value="ORISSA">ORISSA</option>      <option value="CHHATTISGARH">CHHATTISGARH</option>      <option value="MADHYA PRADESH">MADHYA PRADESH</option>
                                <option value="GUJARAT">GUJARAT</option>        <option value="DAMAN AND DIU">DAMAN AND DIU</option>        <option value="DADAR AND NAGAR HAVELI">DADAR AND NAGAR HAVELI</option>      <option value="MAHARASTRA">MAHARASTRA</option>
                                <option value="KARNATAKA">KARNATAKA</option>        <option value="GOA">GOA</option>        <option value="LAKSHADWEEP">LAKSHADWEEP</option>        <option value="KERALA">KERALA</option>
                                <option value="TAMIL NADU">TAMIL NADU</option>      <option value="PUDUCHERRY">PUDUCHERRY</option>      <option value="ANDAMAN AND NICOBAR">ANDAMAN AND NICOBAR</option>        <option value="TELANGANA">TELANGANA</option>
                                <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3" id='citydiv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for='city'>City</label>
                            </div>
                            <input type="text" class="form-control is-invalid" id='city' name='city' value={voterDetails.city} onChange={handleChange} aria-describedby="validatedInputGroupPrepend" required />
                        </div>
                    </div>

                    <div class="mb-3" id='address'>
                        <label for="validationTextarea">Address</label>
                        <textarea class="form-control is-invalid" id="addr" name='address' value={voterDetails.address} onChange={handleChange} placeholder="Enter Address....." required />
                    </div>
                </div>

                <div className='signupform' id='vs2'>
                    <div class="mb-3" id='aadhar'>
                        <label for="aadhar1">Aadhar Number</label>
                        <input type='number' class="form-control is-invalid" id="aadhar1" name='aadhar_number' value={voterDetails.aadhar_number} onChange={handleChange} placeholder="Enter Your Aadhar Number..." required />
                    </div>

                    <div class="mb-3" id='mobile'>
                        <label for="mobile1">Mobile Number</label>
                        <input type='number' class="form-control is-invalid" id="mobile1" name='mobileno' value={voterDetails.mobileno} onChange={handleChange} placeholder="Enter Your Mobile Number..." required />
                    </div>

                    <div class="mb-3" id='email'>
                        <label for="email1">Email</label>
                        <input type='email' class="form-control is-invalid" id="email1" name='email' value={voterDetails.email} onChange={handleChange} placeholder="Enter Your Email..." required />
                    </div>

                    <div class="custom-file mb-3" id='photo'>
                        <input type="file" class="custom-file-input" id="photo1" name='img' value={voterDetails.img} onChange={handleChange} accept="image/png, image/jpeg" required />
                        <label class="custom-file-label" for="photo1">{voterDetails.img}</label>
                    </div>

                    <div class="mb-3" id='pass'>
                        <label for="pass1">Choose a password</label>
                        <input type='password' class="form-control is-invalid" id='pass1' name='password' value={voterDetails.password} onChange={handleChange} placeholder="Enter Password..." required />
                    </div>

                    <div class="mb-3" id='passs'>
                        <label for="pass2">Confirm Password</label>
                        <input type='password' class="form-control is-invalid" id='pass2' name='repass' value={voterDetails.repass} onChange={handleChange} placeholder="Reenter Password..." required />
                    </div>

                    <button className="btn" onClick={saveVoter}>Submit</button>
                    <button className="btn" id='b1' onClick={cancel} type='button'>Cancel</button>

                    <div className='vsr'>
                        <span ref={vsr} id='vsr'></span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default VoterSignUp;