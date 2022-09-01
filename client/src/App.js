import React from 'react';

// integration Apollo inot the frontend of the app
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// connect the front end to the backend server's /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// App functional component
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            {/* only routes that the app will utilize */}
            <Routes>
              {/* HOME */}
              <Route
                path='/'
                element={<Home />}
              />
              {/* LOGIN */}
              <Route
                path='/login'
                element={<Login />}
              />
              {/* SIGNUP */}
              <Route
                path='/signup'
                element={<Signup />}
              />
              {/* PROFILE */}
              <Route path='/profile'>
                {/* /profile/thought.username, the /profile is inherited */}
                <Route path=':username' element={<Profile />}></Route>
                {/* if not username in slug, setup to default to loggedin user's profile */}
                <Route path='' element={<Profile />}></Route>
              </Route>
              {/* SINGLE THOUGHT */}
              <Route
                path='/thought/:id'
                element={<SingleThought />}
              />
              {/* NOT FOUND */}
              <Route
                path='*'
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
