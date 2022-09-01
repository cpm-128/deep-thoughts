import React from 'react';

import { useParams } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {

  // grab the data
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || [];

  if (loading) {
    return <div>L o a d i n g . . .</div>;
  }

  // render to the vdom
  return (
    <div>

      <div className="flex-row mb-3">
        <h2 className="text-primary bg-secondary radius p-3 display-inline-block">
          Viewing {user.username}'s profile.
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
