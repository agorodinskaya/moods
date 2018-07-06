import React, { PropTypes, Component } from 'react'
import axios from 'axios';
import Mopidy from 'mopidy';

export default class Mood extends Component{
  constructor(props){
    super(props);
    this.state={
      emotion:{},
      status: false

    }
    this.buttonHappy = this.buttonHappy.bind(this)
    this.buttonSad = this.buttonSad.bind(this)
    this.buttonPressure = this.buttonPressure.bind(this)
    this.buttonLucky = this.buttonLucky.bind(this)
    // this.buttonEmotion = this.buttonEmotion.bind(this)

  };

  componentDidMount(){
    window.mopidy = new Mopidy({
      webSocketUrl: "ws://192.168.43.157:6680/mopidy/ws/"
    });
  }

  buttonHappy(ev){
    ev.preventDefault();
    // console.log('Happy:', click);
    this.setState({emotion: 'happy', status: true })

    mopidy.tracklist.clear()
    .then( () => {
      return mopidy.tracklist.add(null, null, 'spotify:track:1mvghSCONexEGEuSJVbnsT', null);
    })
    .then( () => {
      return mopidy.playback.play();
    })
    .catch( console.warn );

  }

  buttonSad(ev){
    ev.preventDefault();
    // console.log('Happy:', click);
    this.setState({emotion: 'sad', status: true })

    mopidy.tracklist.clear()
    .then( () => {
      return mopidy.tracklist.add(null, null, 'spotify:track:67rvuV6oRGppOyXZk9OUrs', null);
    })
    .then( () => {
      return mopidy.playback.play();
    })
    .catch( console.warn );

  }
  buttonPressure(ev){
    ev.preventDefault();
    // console.log('Happy:', click);
    this.setState({emotion: 'pressure', status: true })

    mopidy.tracklist.clear()
    .then( () => {
      return mopidy.tracklist.add(null, null, 'spotify:track:2fuCquhmrzHpu5xcA1ci9x', null);
    })
    .then( () => {
      return mopidy.playback.play();
    })
    .catch( console.warn );

  }

  buttonLucky(ev){
    ev.preventDefault();
    // console.log('Happy:', click);
    this.setState({emotion: 'lucky', status: true })

    mopidy.tracklist.clear()
    .then( () => {
      return mopidy.tracklist.add(null, null, 'spotify:track:3vL4TRePEFgdKUWMnYq7bs', null);
    })
    .then( () => {
      return mopidy.playback.play();
    })
    .catch( console.warn );

  }

  // buttonEmotion(){
  //   this.setState({emotion: this.props.emotions , status: true })
  //
  //     mopidy.tracklist.clear()
  //     .then( () => {
  //       return mopidy.tracklist.add(null, null, {emotions.map(emo => emo[value])}, null);
  //     })
  //     .then( () => {
  //       return mopidy.playback.play();
  //     })
  //     .catch( console.warn );
  //
  // }



  render(){
    return(
      <div>
      <h1>Set up your mood:</h1>


      <button className="btnU" onClick={this.buttonHappy}>Happy!</button>
      <button className="btnU" onClick={this.buttonSad}>Sad...</button>
      <button className="btnU" onClick={this.buttonPressure}>Pressure</button>
      <button className="btnU" onClick={this.buttonLucky}>Lucky</button>


      {/*}
      <div>
      {this.props.emotions.map(emo =><button onClick={this.buttonEmotion}></button> )}
      </div>
    */}
      <br/>
      <br/>
      <br/>

      </div>
    )
  }
}
