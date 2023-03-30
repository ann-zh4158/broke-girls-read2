import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import clientReqs from '../clientReqs';

// stores individualized information about each book entry
    // props = title, author, img, etc  

const BookCard = ({ id, author, title, img, kindle, kobo, nook }) => {

    // console.log('img link is: ', img);
    // console.log('hello');

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(clientReqs.deleteBooks);

    function onDelete(e){
        e.preventDefault();
        console.log('title: ', title);
        console.log('id: ', id);
        mutate({id: id}, {
            onSuccess: () => {
                console.log('deleted book!');
                queryClient.invalidateQueries('getBooks');
                setTimeout(() => {
                   navigate('/');
                }, 5000);
            },
        });
    }

    if (isLoading) {
        return <div className="loading">deleting from database... please be patient</div>;
      }
    
    return (
        <Grid item xs={4}>
            <Card sx={{display: 'flex'}}> 
            <CardMedia
                component="img"
                sx={{ width: 162 }}
                image={`https:${img}`}
                alt="cover-image-book"
            />
                <Box sx={{display: 'flex', alignItems: 'center'}}> 
                    <CardContent>
                        <Typography> 
                                <strong>Title: </strong> {title}
                                <br/>
                        </Typography> 
                        <Typography> 
                                <strong>Author: </strong> {author}
                                <br/>
                        </Typography> 
                        <CardActions>
                            <Box>
                                <Link state={{id:id, kindle_url:kindle, nook_url:nook, kobo_url:kobo}} to={`/details/${id}`}>  
                                    <Button variants="contained">Details</Button>
                                </Link>
                            </Box>
                            <Box>
                                <Link state={{title: title, kindle_url:'', nook_url:'', kobo_url:''}} to="/edit">
                                    <Button variants="contained">Edit</Button>
                                </Link>
                            </Box>
                        </CardActions>
                        <CardActions>
                            <Box>
                                <Button variants="contained" onClick={onDelete}>Delete</Button>
                            </Box>
                        </CardActions>
                    </CardContent>  
                </Box>
            </Card>
        </Grid>
    );
};

export default BookCard;