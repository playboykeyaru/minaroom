// src/App.jsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';

export default function App() {
  return (
    <BrowserRouter basename="/minaroom">
      <AppWrapper />
    </BrowserRouter>
  );
}
