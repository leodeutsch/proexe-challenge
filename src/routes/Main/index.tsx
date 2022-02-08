import React from 'react';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import Main from '../../pages/Main';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
