// all request helper functions live here

import axios from 'axios';

const clientReqs = {};
const baseURL = 'http://localhost:8080';
// const baseURL = 'http://localhost:3000'; // production mode should be routing to 3000

clientReqs.getBooks = () => {
    return axios.get(`${baseURL}/books`)
            .then(res => {return res.data;})
                .catch(err => {console.err(`Error in client request to get all books: ${err}`);});
};

clientReqs.postBooks = (reqBody) => {
    axios.post(`${baseURL}/books`, reqBody)
        .then(res => {console.log(res.data);})
            .catch(err => {console.error(`Error in client request to post books: ${err}`);});
};

clientReqs.putBooks = (reqBody) => {
    axios.put(`${baseURL}/books`, reqBody)
        .then(res => {console.log(res.data);})
            .catch(err => {console.error(`Error in client request to put books: ${err}`);});
};

clientReqs.deleteBooks = (reqBody) => {
    axios.delete(`${baseURL}/books`, { data:reqBody })
        .then(res => {console.log(res.data);})
            .catch(err => {console.error(`Error in client request to delete books: ${err}`);});
};

export default clientReqs;