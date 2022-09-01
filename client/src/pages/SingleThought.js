import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

// singleThought functional component
const SingleThought = props => {

  // CREATING THE THOUGHT OBJ
  const { id: thoughtId } = useParams();
    //console.log('>> thoughtId >> ', thoughtId);
    const { loading, data } = useQuery(QUERY_THOUGHT, {
      variables: { id: thoughtId }
    });
  // the data var will populate the thought obj
  const thought = data?.thought || {};
  // will display while data is being processed
  if (loading) {
    return <div>L o a d i n g . . .</div>;
  }

  // VDOM RENDERING
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header text-tertiary">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
