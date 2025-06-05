import { useEffect, useState } from 'react';
import './css/commissioner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img5 from './images/profile.png';
import img6 from './images/switch.png';
import { Link, useNavigate } from 'react-router-dom';
import { getCandidates, getWinner, resetVotes } from '../Services/VoterServiceJava';

export let winner = false;

const ElectionCommissionerPortal = () => {
    const [date, setDate] = useState(new Date());
    const [exit, setExit] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [win, setWin] = useState('');
    const navigate = useNavigate();

    const fetchData = () => {
        getCandidates()
            .then((responce) => { console.log(responce.data); setCandidates(responce.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const reset = () => {
        resetVotes().then((response) => console.log(response.data))
            .catch((err) => console.log("Error: " + err));
    }

    const getWin = () => {
        getWinner()
            .then((response) => setWin(response.data))
            .catch((err) => console.log("Error: " + err));
    }

    useEffect(() => {
        fetchData();
        getWin();
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const logOut = () => {
        navigate('/');
    }

    return (
        <div className="votermain">
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <div className='news'>
                <div className='voterdata'>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th>Candidate Id</th>
                                <th>Candidate Name</th>
                                <th>Party</th>
                                <th>State</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                candidates.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.voter_id}</td>
                                            <td>{ele.first_name} {ele.last_name}</td>
                                            <td>{ele.party}</td>
                                            <td>{ele.state}</td>
                                            <td>{ele.votes}</td>
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
                <h5>Election Commissioner Portal</h5>
            </div>

            <Link to={'commissionerprofile'}>
                <div className='useraction' id='profile'>
                    <img src={img5} />
                    <h5>Profile</h5>
                </div>
            </Link>

            {
                winner &&
                <div className='win'>
                    <div id='vo1'>
                        <h1>Election Winner : {win} </h1>
                    </div>
                </div>
            }

            <div className='useraction' id='logout' onClick={() => setExit(!exit)}>
                <img src={img6} />
                <h5>Log Out</h5>
            </div>

            <div className='useraction' id='reset' onClick={() => reset()}>
                <img src={img6} />
                <h5>Reset</h5>
            </div>

            {
                !winner &&
                <div className='useraction' id='winner' onClick={() => winner = true}>
                    <h5>Announce Winner</h5>
                </div>
            }

            {
                winner &&
                <div className='useraction' id='winner' onClick={() => winner = false}>
                    <h5>Hide Winner</h5>
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

export default ElectionCommissionerPortal;