import React from 'react';
import { Link } from 'react-router-dom';

// the ReactionList component will be given the reaction[] as a prop so it can then be mapped into a list of <p> elements
const ReactionList = ({ reactions }) => {
    return (
        <div className='card mb-3'>

            <div style={{ fontWeight: 700 }} className='card-header text-primary bg-tertiary'>
                <span>Reactions</span>
            </div>

            <div className='card-body'>
                {reactions &&
                    reactions.map(reaction => (
                        <p className='pill bg-light text-dark mb-3' key={reaction._id}>
                            {reaction.reactionBody} {'// '}
                            <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }}>
                                {reaction.username} on {reaction.createdAt}
                            </Link>
                        </p>
                    ))
                }
            </div>

        </div>
    );
};

export default ReactionList;