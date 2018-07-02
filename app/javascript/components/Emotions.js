import React, {Component} from 'react';
import Camera from 'react-webcam';
import axios from 'axios';

const K_EMO = 'https://api.kairos.com/v2/media?'
export default class Emotions extends Component {
  render(){
    return (
      <Camera/>
    )

  }

  }
