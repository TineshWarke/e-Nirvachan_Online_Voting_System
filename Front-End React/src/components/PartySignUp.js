import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../Services/PartyServiceJava";
import './css/partysignup.css';

const PartySignUp = () => {
    const [partyDetails, setPartyDetails] = useState({
        party_name: '', leader_name: '', password: '', region: '', repass: '', img: null
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        setPartyDetails({ ...partyDetails, [name]: value });
    }

    const navigate = useNavigate();
    const cancel = () => {
        navigate('/');
    }
    const vsr = useRef();
    const saveParty = (event) => {
        event.preventDefault();

        if (partyDetails.password != partyDetails.repass) {
            alert("Password dosen't match..!!");
        }
        else {
            signUp(partyDetails)
                .then((response) => {
                    console.log('Party added successfully', response.data);
                    vsr.current.style.color = 'green';
                    vsr.current.innerText = 'Your Party Id : ' + response.data;
                })
                .catch((error) => {
                    console.log('something went wroing' + error.response);
                    vsr.current.style.color = 'red';
                    vsr.current.innerText = 'Party Registration Failed......';
                });
        }
    }

    return (
        <div className="partysign">
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <form class="was-validated">
                <div className='signupform' id='vs1'>
                    <div id='heading'>
                        <h1>Party Details</h1>
                    </div>
                    <div class="mb-3" id='fname'>
                        <label for="pname">Party Full Name</label>
                        <input type='text' class="form-control is-invalid" id="pname" name='party_name' onChange={handleChange} value={partyDetails.party_name} placeholder="Enter Your Party Name..." required />
                    </div>

                    <div class="mb-3" id='lname'>
                        <label for="lname1">Party Leader Voter ID</label>
                        <input type='text' class="form-control is-invalid" id="lname1" name='leader_name' value={partyDetails.leader_name} onChange={handleChange} placeholder="Enter Your Voter ID..." required />
                    </div>

                    <div class="mb-3" id='regiondiv'>
                        <div class="input-group is-invalid">
                            <div class="input-group-prepend" id='ca'>
                                <label class="input-group-text" for="region">Party Region</label>
                            </div>
                            <select class="custom-select" id='region' name='region' value={partyDetails.region} onChange={handleChange} required>
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

                    <div class="custom-file mb-3" id='photo' >
                        <input type="file" class="custom-file-input" id="photo1" name='img' value={partyDetails.img} onChange={handleChange} accept="image/png, image/jpeg" required />
                        <label class="custom-file-label" for="photo">{partyDetails.img}</label>
                    </div>

                    <div class="mb-3" id='pass'>
                        <label for="pass1">Choose a password</label>
                        <input type='password' class="form-control is-invalid" id='pass1' name='password' value={partyDetails.password} onChange={handleChange} placeholder="Enter Password..." required />
                    </div>

                    <div class="mb-3" id='passs'>
                        <label for="pass2">Confirm Password</label>
                        <input type='password' class="form-control is-invalid" id='pass2' name='repass' value={partyDetails.repass} onChange={handleChange} placeholder="Reenter Password..." required />
                    </div>

                    <div className="pbox">
                        <button className="pbtn" onClick={saveParty}>Submit</button>
                        <button className="pbtn" id='b1' onClick={cancel} type='button'>Cancel</button>
                    </div>

                    <div className='vsr'>
                        <span ref={vsr} id='vsr'></span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PartySignUp;