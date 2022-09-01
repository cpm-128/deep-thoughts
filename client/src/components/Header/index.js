import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {

  // logout function and remove token
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">

        {/* Link components */}
        <Link to='/'>
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className='text-center'>
          {/* check if logged in or not and display certain nav items */}
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>My profile</Link>
              {/* logout will refresh and remove the token */}
              <a href='/' onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )
          }
        </nav>

      </div>
    </header>
  );
};

export default Header;
