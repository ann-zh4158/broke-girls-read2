// displays time series for a specific book using ChartJS
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import clientReqs from '../../clientReqs';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, Legend, CategoryScale} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, Legend, CategoryScale);

const options = {   
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    plugins: {
        title: {
            display: true,
            text: 'Book Prices [USD] vs Time [t_now - Δ_mins]',
            position: 'bottom'
        },
        legend: {
            // position: 'top',
            display: true
        },
    },
    scales: {
        y: {
            ticks: {
                // add dollar sign 
                callback: function (val, indx, ticks) {
                    return '$' + val; 
                },
                stepSize: 2
            },
            title: {
                display: true,
                text: 'Prices [$]'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Time [t_now - Δ_mins]'
            }
        }
    },

};

function TimeSeries() {

    const { id } = useParams();   // id that identifies whose data to get 
    const { state } = useLocation();  // state coming in from origin of Link
    const navigate = useNavigate();

    function goBack(e) {
        // clicking go back ---> returns to main page
        e.preventDefault();
        navigate('/');
    }

    // console.log('the id is: ', id);
    console.log('the state is: ', state);

    // wrapper for getPrices --->
    async function wrapGetPrices() {
        return clientReqs.getPrices({ params: { id:id } });
    }

    // GET PRICES
    const priceHist = useQuery({
        queryKey: 'getPrices', 
        queryFn: wrapGetPrices
    });
    console.log(priceHist.data);

    if (priceHist.isLoading) {
        return <div className="loading">loading data... please be patient</div>;
    }
    

    // chart data here
    const chartData = {
        labels: priceHist.data.times,
        datasets: [
          {
            label: 'Rakuten Kobo',
            data: priceHist.data.koboPrices,
            borderColor: 'rgb(60, 179, 113)',
            backgroundColor: 'rgba(60, 179, 113, 0.5)',
          },
          {
            label: 'Barnes & Noble',
            data: priceHist.data.nookPrices,
            borderColor: 'rgb(106, 90, 205)',
            backgroundColor: 'rgba(106, 90, 205, 0.5)',
          },
        ],
      };

    // define suggested y-ranges here bc this is starting to piss me tf off
    // I APPRECIATE YOU SO MUCH MATPLOTLIB AND MATLAB 
    options.scales.y.suggestedMin = priceHist.data.min - 4;
    options.scales.y.suggestedMax = priceHist.data.max + 4; 
    // console.log('chart options: ', options); 

    return (

        <div className="chart">
            <Container>
                <Box sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <form className="actualChart"> 
                        <Line type={options} data={chartData} datasetIdKey={`${id}`}/>
                        <Box m={2} pt={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Button fullWidth variant="contained" color="primary" href={state.kobo_url}>
                                    Buy from Kobo
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button fullWidth variant="contained" color="primary" href={state.nook_url}>
                                    Buy from Barnes & Noble
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button fullWidth variant="contained" color="primary" href={state.kindle_url}>
                                    Buy from Amazon
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button fullWidth variant="contained" color="primary" onClick={goBack}>
                                    Go Back 
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Box>
            </Container>
        </div>

    );

}

// TEST DATA 
    // STOPPED COLLECTION AT Date.now = 1680237165329 [ms]

export default TimeSeries;