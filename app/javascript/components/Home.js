import React, {Component} from 'react';

import { Link } from 'react-router-dom';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.buttonRegister = this.buttonRegister.bind(this)
    this.buttonRecognize = this.buttonRecognize.bind(this)

  }
  buttonRegister(event){
    event.preventDefault();
    this.props.history.push(`/register`)
  }

  buttonRecognize(event){
    event.preventDefault();
    this.props.history.push(`/recognize`)
  }

  render(){
    return(
      <div>

      <button className="btnH" onClick={this.buttonRegister}>Register</button>
      <br></br>
      <button className="btnH" onClick={this.buttonRecognize}>Recognize</button>
      
      </div>
    )
  }
}
