import { useEffect, useState } from 'react';
import './css/voterportal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './images/image.png';
import img2 from './images/accept.png';
import img3 from './images/expired.png';
import img4 from './images/rejected.png';
import img5 from './images/profile.png';
import img6 from './images/switch.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VoterServicesExpress from '../Services/VoterServicesExpress';
import { getWinner, setJoinParty } from '../Services/VoterServiceJava';
import { getPartyData } from '../Services/PartyServiceJava';
import { winner } from './ElectionCommissionerPortal';

const VoterPortal = () => {
    const [myNews, setMyNews] = useState([]);
    const [date, setDate] = useState(new Date());
    const [hide, setHide] = useState('APPROVED');
    const [exit, setExit] = useState(false);
    const [partyShow, setPartyShow] = useState(false);
    const location = useLocation();
    const { userId } = location.state;
    const [partyData, setPartyData] = useState([]);
    const [voter, setVoter] = useState([]);
    const [win, setWin] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        let response = await fetch("https://newsdata.io/api/1/news?country=in&category=politics&apikey=pub_3771303f01e1bb35245eba4b7a32ad3d247f4");
        let data = await response.json();
        console.log(data);
        setMyNews(data.results);
    }

    const fetchPartyData = () => {
        getPartyData()
            .then((response) => { console.log(response.data); setPartyData(response.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const joinParty = (pname) => {
        setJoinParty(pname, userId)
            .then((responce) => console.log(responce.data))
            .catch((err) => console.log(err));
    }

    const getVoter = () => {
        VoterServicesExpress.getVoterById(userId)
            .then((response) => {console.log(response.data); setVoter(response.data); setHide(response.data.status) })
            .catch((err) => console.log(err));
    }

    const getWin = () => {
        getWinner()
            .then((response) => setWin(response.data))
            .catch((err) => console.log("Error: " + err));
    }

    useEffect(() => {
        fetchData();
        fetchPartyData();
        getVoter();
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
                {
                    myNews.map((ele) => {
                        return (
                            <>
                                <div class="card">
                                    <img src={ele.image_url === null ? img1 : ele.image_url} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <div id='title'>
                                            <h5 class="card-title">{ele.title}</h5>
                                            <p class="card-text">{ele.description}</p>
                                        </div>
                                        <a href={ele.link} target='_blank' class="btn btn-primary">Read More</a>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>

            <div className='portal'>
                <h5>Voter Portal </h5>
            </div>

            <div className='datetime'>
                <h5>{date.toDateString()} : {date.toLocaleTimeString()}</h5>
            </div>

            <Link to={"voterprofile"} state={{ voter }}>
                <div className='useraction' id='profile'>
                    <img src={img5} />
                    <h5>Profile</h5>
                </div>
            </Link>

            {
                hide === 'PENDING' &&
                <div className='status' id='pending'>
                    <img src={img3} />
                    <h5>Pending</h5>
                </div>
            }
            {
                hide === 'APPROVED' &&
                <div className='status' id='active'>
                    <img src={img2} />
                    <h5>Active</h5>
                </div>
            }
            {
                hide === 'REJECTED' &&
                <div className='status' id='rejected'>
                    <img src={img4} />
                    <h5>Rejected</h5>
                </div>
            }

            {
                winner &&
                <div className='win'>
                    {hide === 'APPROVED' &&
                        <div id='vo1'>
                            <h1>Election Winner : {win} </h1>
                        </div>
                    }
                </div>
            }

            {
                hide === 'APPROVED' &&
                <div className='joinparty' onClick={() => setPartyShow(!partyShow)}>
                    {
                        !partyShow && <h5>Join Party</h5>
                    }
                    {
                        partyShow && <h5>Cancle</h5>
                    }
                </div>
            }

            {
                partyShow && <div className='partyShow'>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th>Party Id</th>
                                <th>Party Name</th>
                                <th>Party Leader</th>
                                <th></th>
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
                                            <td><button onClick={() => joinParty(ele.partyFullName)}>Join</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

            <div className='v'>
                <div className='vote'>
                    {hide === 'APPROVED' &&
                        <Link to={'/vote'} state={{ voter }}>
                            <div id='vo1'>
                                <h1>Vote Here</h1>
                            </div>
                        </Link>
                    }
                </div>
            </div>


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
        </div>
    );
}

export default VoterPortal;