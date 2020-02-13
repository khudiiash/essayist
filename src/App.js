import React, {Component} from "react";
import Editor from "./containers/Editor";
import Comments from "./containers/Comments";
import './App.css'


class App extends Component {
    constructor(){
      super()
      this.state = {
        replaceTarget: null,
        highlightTarget: null
      }
    }
  replaceById=(text,repl)=> {
    console.log(text,repl)
    this.setState({replaceTarget:{text,repl}})
  }
  killReplaceTarget=()=> {
    this.setState({replaceTarget:null})
  }
  showHighlight=(id,e)=>{
    this.setState({highlightTarget:id})
  }
  render(){
    return (
      <div className="App">
        <Editor replaceTarget={this.state.replaceTarget} killReplaceTarget={this.killReplaceTarget} highlightTarget={this.state.highlightTarget}/>
        <Comments replaceById={this.replaceById} showHighlight={this.showHighlight}/>
      </div>
    );
  }
  }
  

export default App
