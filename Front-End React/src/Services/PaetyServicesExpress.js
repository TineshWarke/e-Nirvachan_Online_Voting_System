import axios from 'axios';
let baseURL = "http://localhost:9000/party";

class PartyService{
    getPartyById(partyid) {
        return axios.get(baseURL + "/id/" + partyid);
    }
}

export default new PartyService();