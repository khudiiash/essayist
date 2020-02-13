import React, { Component } from 'react';
import Comment from './Comment'
import './Comments.scss'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state ={
            comments: props
        }
    }

    render() {
        return (
            <div className='comments'>
                { this.props.comments && this.props.comments.map((comment,id) => (
                    <Comment key={id} comment={comment} replaceById={this.props.replaceById} showHighlight={this.props.showHighlight}></Comment>
                ))}
            </div>
        );
    }
}

export default Comments;