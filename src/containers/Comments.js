import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { commentActions } from '../redux/actions';
import { Comments as BaseComments } from '../components';

const Comments = ({ addComments,replaceById,showHighlight,showFullComment }) => {
    
  let {comments} = useSelector(state => state.comments)

  return (
    <BaseComments
    comments={comments}
    replaceById={replaceById}
    showFullComment={showFullComment}
    showHighlight={showHighlight}
    />
  );
};

export default connect(
  ({ comments }) => comments,
  {...commentActions }
)(Comments);
