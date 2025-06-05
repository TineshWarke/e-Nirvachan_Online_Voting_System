import axios from 'axios';
let baseURL = "http://localhost:9000/voter";

class VoterServicesExpress{
    getVoterById(voterid) {
        return axios.get(baseURL + "/id/" + voterid);
    }
}

export default new VoterServicesExpress();