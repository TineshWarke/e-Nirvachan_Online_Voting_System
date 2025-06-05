import { useEffect, useState } from 'react';
import './css/partyportal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img2 from './images/accept.png';
import img3 from './images/expired.png';
import img4 from './images/rejected.png';
import img5 from './images/profile.png';
import img6 from './images/switch.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCandidateData, getWinner, selectCandidate } from '../Services/VoterServiceJava';
import PaetyServicesExpress from '../Services/PaetyServicesExpress';
import { winner } from './ElectionCommissionerPortal';

const PoliticalPartyPortal = () => {
    const [date, setDate] = useState(new Date());
    const [exit, setExit] = useState(false);
    const [hide, setHide] = useState('');
    const [partyData, setPartyData] = useState([]);
    const [candidateData, setCandidateData] = useState([]);
    const location = useLocation();
    const { partyId } = location.state;
    const [win, setWin] = useState('');
    const navigate = useNavigate();

    const fetchData = () => {
        getCandidateData(partyId)
            .then((responce) => { console.log(responce.data); setCandidateData(responce.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const fetchPartyData = () => {
        PaetyServicesExpress.getPartyById(partyId)
            .then((response) => { console.log(response.data); setPartyData(response.data); setHide(response.data.status) })
            .catch((err) => console.log("Error: " + err));
    }

    const selectCandi = (vid) => {
        selectCandidate(vid, partyId)
            .then((responce) => { console.log(responce.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const getWin = () => {
        getWinner()
            .then((response) => setWin(response.data))
            .catch((err) => console.log("Error: " + err));
    }

    useEffect(() => {
        fetchData();
        fetchPartyData();
        getWin();
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [, candidateData]);

    const logOut = () => {
        navigate('/');
    }

    return (
        <div className="votermain">
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <div className='news'>
                <div className='candidates1'>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th>Candidate Id</th>
                                <th>Candidate Name</th>
                                <th>Age</th>
                                <th>State</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                candidateData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.voter_id}</td>
                                            <td>{ele.first_name} {ele.last_name}</td>
                                            <td>{ele.age}</td>
                                            <td>{ele.state}</td>
                                            <td><button onClick={() => selectCandi(ele.voter_id)}>{ele.candidate}</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='datetime'>
                <h5>{date.toDateString()} : {date.toLocaleTimeString()}</h5>
            </div>

            <div className='portal'>
                <h5>Political Party Portal</h5>
            </div>

            <Link to={'politicalpartyprofile'}>
                <div className='useraction' id='profile'>
                    <img src={img5} />
                    <h5>Profile</h5>
                </div>
            </Link>

            {
                hide == 'PENDING' &&
                <div className='status' id='pending'>
                    <img src={img3} />
                    <h5>Pending</h5>
                </div>
            }
            {
                hide == 'APPROVED' &&
                <div className='status' id='active'>
                    <img src={img2} />
                    <h5>Active</h5>
                </div>
            }
            {
                hide == 'REJECTED' &&
                <div className='status' id='rejected'>
                    <img src={img4} />
                    <h5>Rejected</h5>
                </div>
            }

            {
                winner &&
                <div className='win'>
                    {hide == 'APPROVED' &&
                        <div id='vo1'>
                            <h1>Election Winner : {win} </h1>
                        </div>
                    }
                </div>
            }

            <div className='useraction' id='logout' onClick={() => setExit(!exit)}>
                <img src={img6} />
                <h5>Log Out</h5>
            </div>

            {
                exit &&
                <div className='exit'>
                    <div id='box'>
                        <h4>Do you want logout ??</h4>
                        <button className="btn" id='yes' onClick={logOut}>Yes</button>
                        <button className="btn" id='no' onClick={() => setExit(!exit)}>No</button>
                    </div>
                </div>
            }
        </div >
    );
}

export default PoliticalPartyPortal;