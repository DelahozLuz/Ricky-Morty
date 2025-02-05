

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import { ApolloProvider } from '@apollo/client';

import { client } from './graphql/apolloClient'; 

import Favorites from './components/FavoritesList';
import CharacterDetail from './components/CharacterDetail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
