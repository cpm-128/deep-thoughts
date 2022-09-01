import React from 'react';
import { useParams } from 'react-router-dom';

// singleThought functional component
const SingleThought = props => {

  const { id: thoughtId } = useParams();
  console.log('>> thoughtId >> ', thoughtId);

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header text-tertiary">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          thought on createdAt
        </p>
        <div className="card-body">
          <p>Thought Text.. n/a, hard coded</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
