import httpCient from '../http-commonJava';

export const logIn = (vid, pass) => {
  return httpCient.post('voters/login', [vid, pass]);
}

export const getVoterData = () => {
  return httpCient.get('voters/voterslist');
}

export const signUp = (voter) => {
  return httpCient.post('voters/register', [voter.first_name, voter.last_name, voter.password, voter.gender, voter.dob,
  voter.address, voter.city, voter.state, voter.mobileno, voter.email, voter.aadhar_number, voter.caste, voter.img]);
}

export const getVoterById = (vid) => {
  return httpCient.get('voters/id/' + vid);
}

export const setStatus = (vid, st) => {
  return httpCient.put('voters/status', [vid, st]);
}

export const setJoinParty = (pname, vid) => {
  return httpCient.post('voters/joinparty', [pname, vid]);
}

export const getCandidateData = (pid) => {
  return httpCient.get('voters/candidateslist/' + pid);
}

export const selectCandidate = (vid, partyId) => {
  return httpCient.put('voters/selectcandidate', [vid, partyId]);
}

export const getCandidates = () => {
  return httpCient.get('voters/candidates');
}

export const resetVotes = () => {
  return httpCient.put('voters/resetvotes');
}

export const votes = (vid, cid) => {
  return httpCient.put('voters/vote', [vid, cid]);
}

export const getWinner = () => {
  return httpCient.get('voters/winner');
}