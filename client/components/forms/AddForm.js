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
import { useNavigate } from 'react-router-dom';

// route to this form when user clicks "add new book"

const localState = {
    title:'',
    author: '',
    nook_url: '',
    kindle_url: '',
    kobo_url:''
};

function AddForm() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(clientReqs.postBooks);

    const [book, setBook] = useState(localState);

    function handleAdd(e) {
        // on successful submission of form --> 
        e.preventDefault();
        mutate(book, {
            onSuccess: () => {
                console.log('added book!');
                queryClient.invalidateQueries('getBooks');
                setTimeout(() => {
                   navigate('/');
                }, 5000);
            },
        });
    }

    function handleCancel(e) {
        // on clicking the "cancel" button
        e.preventDefault();
        navigate('/');
    }

    function handleChange(e) {
        // handle filling out fields
        e.preventDefault();
        const { name, value } = e.target; 
        setBook({
            ...book,
            [name]:value
        });
    } 
    
    if (isLoading) {
        return <div className="loading">updating... please be patient</div>;
    }


return (
    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <form className="forms" onSubmit={handleAdd}>
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
                        value={book.title}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Author"
                            variant="outlined"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Amazon URL"
                            variant="outlined"
                            name="kindle_url"
                            value={book.kindle_url}
                            onChange={handleChange}
                        />
                        </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="Kobo URL"
                        variant="outlined"
                        name="kobo_url"
                        value={book.kobo_url}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        label="B&N URL"
                        variant="outlined"
                        name="nook_url"
                        value={book.nook_url}
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
                    Add
                    </Button>
                    <Button variant="contained" onClick={handleCancel}> 
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

export default AddForm; 