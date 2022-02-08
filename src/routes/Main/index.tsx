import React from 'react';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import Main from '../../pages/Main';

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
