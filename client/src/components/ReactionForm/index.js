import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_REACTION } from '../../utils/mutations';

// functional component
const ReactionForm = ({ thoughtId }) => {

    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add reaction to db
            await addReaction({
                variables: { reactionBody, thoughtId }
            });
            //clear form
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    // vdom rendering
    return (

        <div>

            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className='ml-2 text-error'>Something went wrong. Refresh and try again. Your reaction will not be saved.</span>}
            </p>

            <form
                className='flex-row justify-center justify-space-between-md align-stretch'
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder='Leave a reaction to this thought . . .'
                    className='form-input col-12 col-md-9'
                    value={reactionBody}
                    onChange={handleChange}
                ></textarea>
                <button className='btn col-12 col-md-3' type='submit'>
                    Submit
                </button>
            </form>

        </div>

    );
};

export default ReactionForm;