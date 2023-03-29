import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookCard from './BookCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clientReqs from '../clientReqs';
import { useQuery } from 'react-query';

// top-most application containing everything

function App() {

  // GET ALL BOOKS !
  const bookList = useQuery('getBooks', clientReqs.getBooks);

  if (bookList.isLoading) {
    return <div className="loading">loading data... please be patient</div>;
  }

  // const [page, setPage] = useState(initState);

  // const toPage = (page) => (event) => {
  //   event.preventDefault();
  //   setPage(page);
  // };

    return (
      <div className="App"> 
        <Container>
            <Container> 
              <Box sx={{alignItems: 'center', textAlign: 'center'}}>
                <Button size="large" variants="contained" sx={{ color: 'red'}}>
                    Click here to add more books!
                </Button>
              </Box>
            </Container>
          <Grid container spacing={5}>
            {bookList.data.map((book, indx) => {
              return <BookCard title={book.title} author={book.author} img={book.img} 
                id={book.book_id} kindle={book.kindle_url} kobo={book.kobo_url} nook={book.nook_url} key={indx}/>;
            })}
          </Grid>
        </Container>
      </div>
      );
}

export default App;