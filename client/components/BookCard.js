import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// stores individualized information about each book entry
    // props = title, author, img, etc  

const BookCard = ({ id, author, title, img, kindle, kobo, nook }) => {

    // console.log('img link is: ', img);
    // console.log('hello');
    
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
                                <Button variants="contained">Details</Button>
                            </Box>
                            <Box>
                                <Button variants="contained">Edit</Button>
                            </Box>
                        </CardActions>
                        <CardActions>
                            <Box>
                                <Button variants="contained">Delete</Button>
                            </Box>
                        </CardActions>
                    </CardContent>  
                </Box>
            </Card>
        </Grid>
    );
};

export default BookCard;