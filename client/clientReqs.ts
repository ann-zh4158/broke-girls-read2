// all request helper functions live here

import axios from 'axios';
import postProcess from './components/infoPage/postProcess';

const baseURL = 'http://localhost:8080';
// const baseURL = 'http://localhost:3000'; // production mode should be routing to 3000

const clientReqs = {
    getBooks: async ():Promise<unknown> => {
        return axios.get(`${baseURL}/books`)
                .then(res => {return res.data;})
                    .catch(err => {console.error(`Error in client request to get all books: ${err}`);});       
    },

    postBooks: async (reqBody:object):Promise<void> => {
        axios.post(`${baseURL}/books`, reqBody)
            .then(res => {console.log(res.data);})
                .catch(err => {console.error(`Error in client request to post books: ${err}`);});
    },

    putBooks: async (reqBody:object):Promise<void> => {
        axios.put(`${baseURL}/books`, reqBody)
            .then(res => {console.log(res.data);})
                .catch(err => {console.error(`Error in client request to put books: ${err}`);});        
    },

    deleteBooks: async (reqBody:object):Promise<void> => {
        axios.delete(`${baseURL}/books`, { data:reqBody })
            .then(res => {console.log(res.data);})
                .catch(err => {console.error(`Error in client request to delete books: ${err}`);});        
    },

    getPrices: async (reqParams:object):Promise<unknown> => {
        // reqParams format: 
            // { params: { id: NUM } }  --> this is req.query.id on the server side 
        return axios.get(`${baseURL}/prices/`, reqParams)
            .then(res => {return postProcess(res.data);})
                .catch(err => {console.error(`Error in client request to get all prices: ${err}`);});
    }

};

export default clientReqs;