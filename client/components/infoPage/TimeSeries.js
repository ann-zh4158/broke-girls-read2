// displays time series for a specific book using ChartJS
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import clientReqs from '../../clientReqs';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

function TimeSeries() {

    const { id } = useParams();   // id that identifies whose data to get 
    const { state } = useLocation();  // state coming in from origin of Link
    console.log('the id is: ', id);
    console.log('the state is: ', state);

    return (
        <div>
            HELLO! This is the details page for book { id }.
        </div>
    );

}

// TEST DATA 
    // STOPPED COLLECTION AT Date.now = 1680237165329 [ms]

export default TimeSeries;