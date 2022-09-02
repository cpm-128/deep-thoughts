import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

// ThoughtForm functional component
const ThoughtForm = () => {

    // ability to submit a thought
    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        // update cache manually to display thoughts on page without refreshing which is when cache would normally be grabbed and renders updated
        // addThought represents the new thought in the form we are adding
        update(cache, { data: { addThought } }) {

            // try updating the user's array first
            try {
                const { me } = cache.readQuery({ query: QUERY_ME});
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: {...me, thoughts: [...me.thoughts, addThought] } },
                });
            } catch (e) {
                console.warn('First thought insertion by user.')
            }

            // read what's currently in the cache
            const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

            // prepend the newest thought to the front of the array
            cache.writeQuery({
                query: QUERY_THOUGHTS,
                data: { thoughts: [addThought, ...thoughts] }
            });

        }
    });

    // character handling on thoughtForm
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to db
            await addThought({
                variables: { thoughtText }
            });
            // clear form
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    // JSX rendering
    return (

        <div>

            {/* charactercount limit is set to 280, use error text if charactercount equals 280 */}
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className='ml-2 text-error'>Something went wrong. Refresh and try again. Your thought will not be saved.</span>}
            </p>

            <form
                className='flex-row justify-center justify-space-between align-stretch'
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought . . ."
                    value={thoughtText}
                    className='form-input col-12 col-md-9'
                    onChange={handleChange}
                ></textarea>
                <button className='btn col-12 col-md-3' type='submit'>Submit</button>
            </form>

        </div>

    );
};

export default ThoughtForm;