// all request helper functions live here

import axios from 'axios';

const clientReqs = {};
const baseURL = 'http://localhost:8080';

clientReqs.getBooks = () => {
    return axios.get(`${baseURL}/books`)
            .then(res => {return res.data;})
                .catch(err => {console.err(`Error in client request to get all books: ${err}`);});
};

export default clientReqs;