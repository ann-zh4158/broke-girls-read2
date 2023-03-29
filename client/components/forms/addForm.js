import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

// route to this form when user clicks "add new book"

function addForm(props) {


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
                        label="Title"
                        variant="outlined"
                        name="title"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Author"
                            variant="outlined"
                            name="author"
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Amazon URL"
                            variant="outlined"
                            name="kindle_url"
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="Kobo URL"
                        variant="outlined"
                        name="kobo_url"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="B&N URL"
                        variant="outlined"
                        name="nook_url"
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
                    Add
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

export default addForm; 