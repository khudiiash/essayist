import React from "react";
import { Editor as EditorBase } from "../components";
import { connect } from "react-redux";
import { commentActions } from '../redux/actions'
import {useSelector} from 'react-redux'

const Editor = ({addComments,replaceTarget,killReplaceTarget,highlightTarget}) => {
    let stateComments = useSelector(state => state.comments)
    return <EditorBase
      replaceTarget={replaceTarget} 
      killReplaceTarget={killReplaceTarget} 
      addComments={addComments} 
      stateComments={stateComments}
      highlightTarget={highlightTarget}
      />;
};

export default connect(({ comments }) => ({
  comments: comments
}), { ...commentActions },
)(Editor);
