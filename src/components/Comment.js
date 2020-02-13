import React, { Component, useState } from 'react';
import './Comment.scss'
import prepositions from '../libraries/prepositions'
import {useSpring,animated} from 'react-spring'
import * as easings from 'd3-ease'


const Link = ({ url }) => {
    return (
        <a href={url} target='_blank' className="comment__header__learn-more">
            Learn more
        </a>
    )

}
const Comment=({showHighlight,comment: { id, name, text, replaceOptions, readMore, mistake }, replaceById})=> {
      

    let [state,handleComment] = useState({maxHeight: '40px',left: '0'})
   
    const appearComment = useSpring({
        to: {transform: 'translateX(0) scale(1)',maxHeight: state.maxHeight, left: state.left},
        from: {transform: 'translateX(550px) scale(0)'},
        config: {duration: 300}
    })
    const hideComment = (e) => {
        handleComment({ maxHeight: '40px', left:'0'})
        showHighlight('off', e)
    }
    const handleMouseOver = (id,e) => {
        showHighlight(id, e)
        handleComment({ maxHeight: '550px',left:'-25px' })
    }
   

    let textToReplace = mistake

    if (mistake === 'which') {
        textToReplace = new RegExp(`(?<=\\b(?:a|the|are|is|(?!this)\\w+s)\\b\\s(\\w+\\s){1,4})(?<!(?:${prepositions})\\s)which`,`gi`)
    }

    let replaceItems = []
    if (replaceOptions) {
        if (replaceOptions.includes('[')) {
            text = replaceOptions.split('[')[1].replace(/\]/, '')
            replaceOptions = replaceOptions.split('[')[0]
        }
        if (replaceOptions.includes(',') && !['APA Journal Formatting','APA Formatting','MLA Formatting', 'Punctuation','APA Title Formatting'].includes(name)) {
            replaceItems = replaceOptions.split(',').map(r => r.trim())
        } else {
            if (name === 'Punctuation' && replaceOptions.charAt(0) === ',') {
                mistake = ' '+mistake
            }
            replaceItems.push(replaceOptions.trim())
        }
        
    }
    return (
        <animated.div id={id} className='comment' style={appearComment} onMouseOver={(e) => handleMouseOver(id,e)} onMouseLeave={hideComment}>
            <div className='comment__header'>
                <div className='comment__header__line'></div>
                <h2>{name}</h2>
                <div className='comment__header__mistake'>{mistake}</div>
            </div>
            <p className='comment__text' dangerouslySetInnerHTML={{ __html: text }}></p>
            {replaceItems.length ?
                <div className='comment__replaces'>{replaceItems.map((repl, index) => (<button className='comment__replaces-replace' onClick={() => replaceById(textToReplace, repl)} key={index}>{repl}</button>))}</div>
                : ''
            }
            {readMore &&
                <Link url={readMore} />}

        </animated.div>
    );


}

export default Comment;