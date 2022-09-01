import React from 'react';

import { useParams, Navigate } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  // grab the data
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || [];

  // navigate to personal profile page is uername is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>L o a d i n g . . .</div>;
  }

  // if visit url and not logged in
  if (!user?.username) {
    return (
      <h4>
        You must be logged in to access this page. Use the buttons above to sign up or log in.
      </h4>
    )
  }

  // render to the vdom
  return (
    <div>

      <div className="flex-row mb-3">
        <h2 className="text-primary bg-secondary radius p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">

        <div className="col-12 mb-3 col-lg-8">
          {/* PRINT THOUGHT LIST  */}
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts . . .`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          {/* PRINT FRIEND LIST */}
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
            className='text-light'
          />
        </div>

      </div>

    </div>
  );
};

export default Profile;
