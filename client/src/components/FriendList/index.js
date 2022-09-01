import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {

    // do friends exists?
    if (!friends || !friends.length) {
        return <p className='p-2 bg-tertiary text-primary radius'>{username}, make some friends!</p>;
    }

    // vdom rendering
    return (
        <div>

            <h5>
                {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
            </h5>

            {friends.map(friend => (
                <button className='btn w-100 display-block mb-2 bg-tertiary text-primary' key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>
                        {friend.username}
                    </Link>
                </button>
            ))}

        </div>
    );
};

export default FriendList;