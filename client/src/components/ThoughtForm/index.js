import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';

// ThoughtForm functional component
const ThoughtForm = () => {

    // ability to submit a thought
    const [addThought, { error }] = useMutation(ADD_THOUGHT);

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