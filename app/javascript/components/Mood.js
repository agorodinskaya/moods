import React, { PropTypes, Component } from 'react'
import axios from 'axios';
import Mopidy from 'mopidy';

export default class Mood extends Component{
  constructor(props){
    super(props);
    this.state={
      emotion:'',
      status: false

    }
    this.buttonHappy = this.buttonHappy.bind(this)
    this.buttonSad = this.buttonSad.bind(this)

  };

  componentDidMount(){
    window.mopidy = new Mopidy({
      webSocketUrl: "ws://192.168.43.157:6680/mopidy/ws/"
    });
  }

  buttonHappy(click){
    // console.log('Happy:', click);
    this.setState({emotion: 'happy', status: true })

    mopidy.tracklist.clear()
    .then( () => {
      return mopidy.tracklist.add(null, null, 'spotify:track:67rvuV6oRGppOyXZk9OUrs', null);
    })
    .then( () => {
      return mopidy.playback.play();
    })
    .catch( console.warn );

  }

  buttonSad(){
    
  }



  render(){
    return(
      <div>
      <h1>Set up your mood:</h1>


      <button onClick={this.buttonHappy}>Happy!</button>
      <button onClick={this.buttonSad}>Sad..</button>

      <br/>
      <br/>
      <br/>

      </div>
    )
  }
}
