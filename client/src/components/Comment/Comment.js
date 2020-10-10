import React from 'react';


export default function Comment(props) {
    let text = props.comment.text

    return (
        <h3>{text}</h3>
    )
};
