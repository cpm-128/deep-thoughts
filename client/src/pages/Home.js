import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {

  // use useQuery hook to make a query request
  // apollo/client's loading property indicates that the request isn't done just yet
  // when the reuqest is done, it's stored in data
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // question mark = wait until data is done loading. default to an empty array while data is undefined
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {/* PRINT THOUGHT LIST */}
          {loading ? (
            <div>L o a d i n g  .  .  .</div>
          ) : (
            <ThoughtList thoughts={thoughts} title='Some Feed For Thoughts . . .' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
