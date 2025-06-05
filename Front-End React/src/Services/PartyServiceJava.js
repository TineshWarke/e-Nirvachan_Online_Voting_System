import httpCient from '../http-commonJava';

export const getPartyData = () => {
  return httpCient.get('party/partylist');
}

export const partyLogIn = (vid, pass) => {
  return httpCient.post('party/login', [vid, pass]);
}

export const signUp = (party) => {
  return httpCient.post('party/register', [party.party_name, party.leader_name, party.region, party.password, party.img]);
}

export const setPartyStatus = (pid, st) => {
  return httpCient.put('party/status', [pid, st]);
}

// export const getPartyById = (partyId) => {
//   return httpCient.get('party/id/' + partyId);
// }