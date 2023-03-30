import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';
import TimeSeries from './infoPage/TimeSeries';
import NotFound from './NotFound';

// top-most application containing everything

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/add" element={<AddForm />}/>
      <Route path="/edit" element={<EditForm />}/>
      <Route path="/details/:id" element={<TimeSeries />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>

  );

}

export default App;