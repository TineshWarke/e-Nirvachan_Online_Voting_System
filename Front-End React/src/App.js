import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import VoterPortal from './components/VoterPortal';
import PoliticalPartyPortal from './components/PoliticalPartyPortal';
import ElectionExecutivePortal from './components/ElectionExecutivePortal';
import ElectionCommissionerPortal from './components/ElectionCommissionerPortal';
import VoterSignUp from './components/VoterSignUp';
import VoterProfile from './components/VoterProfile';
import PartySignUp from './components/PartySignUp';
import Vote from './components/Vote';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='voterportal' element={<VoterPortal />} />
        <Route path='politicalpartyportal' element={<PoliticalPartyPortal />} />
        <Route path='electionexecutiveportal' element={<ElectionExecutivePortal />} />
        <Route path='electioncommissionerportal' element={<ElectionCommissionerPortal />} />
        <Route path='register' element={<VoterSignUp />} />
        <Route path='voterportal/voterprofile' element={<VoterProfile />} />
        <Route path='partyregistration' element={<PartySignUp/>}/>
        <Route path='vote' element={<Vote/>}/>
      </Routes>
    </div>
  );
}

export default App;
