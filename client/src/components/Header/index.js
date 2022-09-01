import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">

        {/* Link components */}
        <Link to='/'>
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className='text-center'>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;
