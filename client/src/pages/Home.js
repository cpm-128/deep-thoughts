import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {

  // use useQuery hook to make a query request
  // apollo/client's loading property indicates that the request isn't done just yet
  // when the reuqest is done, it's stored in data
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // question mark = wait until data is done loading. default to an empty array while data is undefined
  const thoughts = data?.thoughts || [];
  //console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>

        {/* THOUGHT FORM if logged in */}
        {/* this is above the flex row below, instead of added to the ifLoggedIn check, for formatting purposes: keep thoughtList and friendList aligned */}
        {loggedIn && (
          <div className='col-12 mb-3'>
            <ThoughtForm />
          </div>
        )}

        {/* if not logged in, full width; if logged in, 8/12 */}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {/* PRINT THOUGHT LIST */}
          {loading ? (
            <div>L o a d i n g  .  .  .</div>
          ) : (
            <ThoughtList thoughts={thoughts} title='Some Feed For Thoughts . . .' />
          )}
        </div>

        {/* right column is logged in */}
        {loggedIn && userData ? (
          <div className='col-12 col-lg-3 mb-3'>
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}

      </div>
    </main>
  );
};

export default Home;
