import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comment/comment-actions';

export default function NewCommentForm() {
// need to grab id and timestamp from previous page, pass down the toggle for showing new comment
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(postComment('new comment', text, 1, 'demo', 1, 555));
        // close the comment form
        setText('');
        return;
        }

    return (
        <form onSubmit={handleSubmit}>
        <textarea onChange={handleTextChange} value={text}/>
            <button type='submit'>Submit</button>
        </form>
    )
}
