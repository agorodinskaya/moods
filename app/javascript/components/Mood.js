import React, { PropTypes, Component } from 'react'
import axios from 'axios';

export default class Mood extends Component{
  constructor(props){
    super(props);
    this.state={
      emotion:'',

    }
    this.buttonHappy = this.buttonHappy.bind(this)
    this.buttonSad = this.buttonSad.bind(this)

  };

  buttonHappy(click){
    console.log('Happy:', click);
    axios.post('/user_emotion', {face_id:this.props.face_id, emotion:'happy'})
  }

  buttonSad(ev){
    console.log(ev)
    axios.post('/user_emotion', {emotion:'sad'});
  }



  render(){
    return(
      <div>
      <h1>Set up the mood in your room:</h1>


      <button onClick={this.buttonHappy}>Happy!</button>
      <button onClick={this.buttonSad}>Sad..</button>

      <br/>
      <br/>
      <br/>

      </div>
    )
  }
}
