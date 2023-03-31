import React from 'react';
import BookCard from './BookCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import clientReqs from '../clientReqs';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom'; 

// renders homepage

function Home() {

  // GET ALL BOOKS !
  const bookList = useQuery('getBooks', clientReqs.getBooks);

  const navigate = useNavigate();

  // clicking add books
  function onAdd(e) {
    e.preventDefault();
    navigate('/add');
  }

  if (bookList.isLoading) {
    return <div className="loading">loading data... please be patient</div>;
  }

    return (
      <div className="Home"> 
        <Container>
            <Container> 
              <Box sx={{alignItems: 'center', textAlign: 'center'}}>
                <Button size="large" variants="contained" sx={{ color: 'red'}} onClick={onAdd}>
                    Click here to add more titles!
                </Button>
              </Box>
            </Container>
          <Grid container spacing={5} sx={{alignItems: 'center'}}>
            {bookList.data.map((book, indx) => {
              return <BookCard title={book.title} author={book.author} img={book.img} 
                id={book.book_id} kindle={book.kindle_url} kobo={book.kobo_url} nook={book.nook_url} key={indx}/>;
            })}
          </Grid>
        </Container>
      </div>
      );    

}

export default Home;