import React from 'react';


export default function Comment(props) {
    let text = props.comment.text
    if (props.comment.id == props.focus){
        return <h1>{text}</h1>
    }
    return (
        <h3>{text}</h3>
    )
};
