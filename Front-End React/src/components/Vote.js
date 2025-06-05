import { useEffect, useState } from 'react';
import './css/vote.css';
import { useLocation, useNavigate } from 'react-router-dom';
import img1 from './images/Vote/book.png';
import img2 from './images/Vote/cap.png';
import img3 from './images/Vote/cat.png';
import img4 from './images/Vote/fan.png';
import img5 from './images/Vote/dog.png';
import img6 from './images/Vote/kite.png';
import img7 from './images/Vote/palm-tree.png';
import img8 from './images/Vote/pen.png';
import { getCandidates, votes } from '../Services/VoterServiceJava';

const Vote = () => {
    const [counter, setCounter] = useState(60);
    const location = useLocation();
    const { voter } = location.state;
    const [userId, setUserId] = useState('');
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    setInterval(() => counter > 0 ? setCounter(counter - 1) : navigate('/'/*, { state: userId }*/), 1000);

    const fetchData = () => {
        getCandidates()
            .then((response) => { console.log(response.data); setCandidates(response.data); })
            .catch((err) => console.log("Error: " + err));
    }

    const vote = (cid) => {
        votes(userId, cid)
            .then((response) => {console.log(response.data); alert("Voted : "+ response.data)})
            .catch((err) => console.log("Error: " + err));
    }

    useEffect(() => {
        fetchData();
        setUserId(voter.voter_id);
    }, [])

    return (
        <div className='election'>
            <div className='title'>
                <h2>e-Nirvachan : Online Voting System</h2>
            </div>

            <div className='countdown'>
                <h5> Time Remaining: {counter} </h5>
            </div>

            <div className='voter1'>
                <h5> {voter.voter_id} : {voter.first_name} {voter.last_name} </h5>
            </div>

            <div className='candidates'>
                {
                    candidates.map((ele) => {
                        return (
                            <div className='candidate' onClick={() => vote(ele.voter_id)}>
                                <img src={img4} /> <h3>{ele.first_name} {ele.last_name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Vote;