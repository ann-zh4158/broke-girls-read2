import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import  { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import clientReqs from '../../clientReqs';
import { useNavigate, useLocation } from 'react-router-dom';

// routes to this form if user clicks "edit"

function EditForm() {

    const { state } = useLocation();
    // console.log(state);
    const [putBody, setPut] = useState(state);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(clientReqs.putBooks);

    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target; 
        setPut({
            ...putBody,
            [name]:value
        });
    } 

    function handlePut(e) {
        e.preventDefault();
        console.log('req body is: ', putBody);
        mutate(putBody, {
            onSuccess: () => {
                console.log('edited urls!');
                queryClient.invalidateQueries('getBooks');
                setTimeout(() => {
                   navigate('/');
                }, 2500);
            },
        });
    }

    function onCancel(e) {
        e.preventDefault();
        navigate('/');
    }

    if (isLoading) {
        return <div className="loading">updating... please be patient</div>;
    }

return (
    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <form className="forms" onSubmit={handlePut}>
        <Grid container alignItems="center" justify="center" spacing={1}>
            <Grid item md={12}>
            <Card sx={{display: 'row'}}>
                <CardHeader title="EDIT URLS"></CardHeader>
                <CardContent>
                    <Grid item container spacing={1} justify="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="New Amazon URL"
                        variant="outlined"
                        name="kindle_url"
                        value={putBody.kindle_url}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="New Kobo URL"
                            variant="outlined"
                            name="kobo_url"
                            value={putBody.kobo_url}
                            onChange={handleChange}
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="New B&N URL"
                            variant="outlined"
                            name="nook_url"
                            value={putBody.nook_url}
                            onChange={handleChange}
                        />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}>
                    <Button variant="contained" type="submit"> 
                    Edit
                    </Button>
                    <Button variant="contained" onClick={onCancel}> 
                    Cancel
                    </Button>
                </CardActions> 
            </Card>
        </Grid>
        </Grid>
        </form>
    </Box> 
);

}

export default EditForm; 