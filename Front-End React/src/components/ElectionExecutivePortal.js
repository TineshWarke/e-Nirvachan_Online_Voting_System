import { useEffect, useState } from 'react';
import './css/executiveportal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img5 from './images/profile.png';
import img6 from './images/switch.png';
import { Link, useNavigate } from 'react-router-dom';
import { getVoterData, getWinner, setStatus } from '../Services/VoterServiceJava';
import { getPartyData, setPartyStatus } from '../Services/PartyServiceJava';
import { winner } from './ElectionCommissionerPortal';

const ElectionExecutivePortal = () => {
    const [date, setDate] = useState(new Date());
    const [exit, setExit] = useState(false);
    const [voterData, setVoterData] = useState([]);
    const [partyData, setPartyData] = useState([]);
    const [win, setWin] = useState('');
    const navigate = useNavigate();

    const fetchData = () => {
        getVoterData()
            .then((responce) => { console.log(responce.data); setVoterData(responce.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const fetchPartyData = () => {
        getPartyData()
            .then((responce) => { console.log(responce.data); setPartyData(responce.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const changeVStatus = (vid, st) => {
        setStatus(vid, st)
            .then((responce) => console.log('Success ' + responce.data))
            .catch((err) => console.log('Error: ' + err));
    }

    const changePStatus = (pid, st) => {
        setPartyStatus(pid, st)
            .then((responce) => console.log('Success ' + responce.data))
            .catch((err) => console.log('Error: ' + err));
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
    }, [, voterData, partyData]);

    const logOut = () => {
        navigate('/');
    }

    return (
        <div className="votermain">
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <div className='news' id='n'>
                <div className='voterdata'>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th>Voter Id</th>
                                <th>Voter Name</th>
                                <th>Aadhar Number</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                voterData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.voter_id}</td>
                                            <td>{ele.first_name} {ele.last_name}</td>
                                            <td>{ele.aadhar_number}</td>
                                            <td>{ele.status}</td>
                                            <td><button onClick={() => changeVStatus(ele.voter_id, 'APPROVED')}>Aprove</button>
                                                <button onClick={() => changeVStatus(ele.voter_id, 'REJECTED')}>Reject</button></td>
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

            <div className='portal' id='p'>
                <h5>Election Executive Portal</h5>
            </div>

            <Link to={'executiveprofile'}>
                <div className='useraction' id='profile'>
                    <img src={img5} />
                    <h5>Profile</h5>
                </div>
            </Link>

            <div className='party1'>
                <div className='partydata'>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th>Party Id</th>
                                <th>Party Name</th>
                                <th>Party Leader</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                partyData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.partyId}</td>
                                            <td>{ele.partyFullName}</td>
                                            <td>{ele.partyLeader}</td>
                                            <td>{ele.status}</td>
                                            <td><button onClick={() => changePStatus(ele.partyId, 'APPROVED')}>Aprove</button>
                                                <button onClick={() => changePStatus(ele.partyId, 'REJECTED')}>Reject</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='useraction' id='logout' onClick={() => setExit(!exit)}>
                <img src={img6} />
                <h5>Log Out</h5>
            </div>

            {
                winner &&
                <div className='win' id='e'>
                        <div id='vo1'>
                            <h1>Election Winner : {win} </h1>
                        </div>
                </div>
            }

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

export default ElectionExecutivePortal;