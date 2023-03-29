import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

// routes to this form if user clicks "edit"

function editForm(props) {

    

return (
    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <form className="forms">
        <Grid container alignItems="center" justify="center" spacing={1}>
            <Grid item md={12}>
            <Card sx={{display: 'row'}}>
                <CardHeader title="ADD NEW BOOK"></CardHeader>
                <CardContent>
                    <Grid item container spacing={1} justify="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="New Amazon URL"
                        variant="outlined"
                        name="new_kindle_url"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="New Kobo URL"
                            variant="outlined"
                            name="new_kobo_url"
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="New B&N URL"
                            variant="outlined"
                            name="new_nook_url"
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
                    <Button variant="contained"> 
                    Edit
                    </Button>
                    <Button variant="contained"> 
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

export default editForm; 