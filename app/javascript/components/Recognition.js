import React, {Component} from 'react';
import Camera from 'react-webcam';

import axios from 'axios';

const K_VERIFY = 'https://api.kairos.com/recognize';
const MS_URL = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?';
export default class Recognition extends Component {
    constructor(props){
      super(props);
      this.state={
        photo: null,
        status: false,
        username: '',
        email:'',
        errors: '',

      };
      this.buttonClick = this.buttonClick.bind(this)
    }
    setRef = (webcam) => {
      this.webcam = webcam;
    }

    buttonClick(){
      const photo = this.webcam.getScreenshot();
      this.setState({
        status: true
      });
      axios.post(K_VERIFY, {
        gallery_name: 'TEST-1',
        image: photo
      },
      {
        headers: {
          'Content-Type': 'application/json',
          app_id: '048de122',
          app_key: 'ff633fe82a3c8b6d0d85095c4aceac2f'
        }
      }).then(response =>{

        // Handle the response from Kairos
        console.log('response:', response, response.data);
        this.setState({
            status: false,
        });

        const {images} = response.data;
        if(images.length && images[0].transaction.status === 'success' ){
          // Post the ID from Kairos to Rails backend, to see if we have a match to login
          return axios.post('/face_login', { face_id: images[0].transaction.face_id });
        } else {
          console.warn('KAIROS: FACE NOT FOUND ERROR');
          this.setState({errors: 'Face not found'});
        }


      })
      .then(response => {

        // Handle the response from Rails
        // this.results = response.data
        console.log('Rails LOGIN RESPONSE', response.data);

        // if successful
        if(response.data.user.k_face_id !== null){
          // return axios.post(MS_URL,
          //   {
          //     /* form data here? */
          //   },
          //   {
          //     // Axios config options
          //     body: photo,
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //       // 'Ocp-Apim-Subscription-Key': '50142d4d105d488090e3e01771332002'
          //       'Ocp-Apim-Subscription-Key': '240dc93db1e241669a8bf0883695ecce'
          //   }
          // });
        }

      })
      .then(response => {
        console.log('MS EMOTION:', response.data);

        // return the emotion for raspberry pi - GET
        // return axios.get('pi url');
      })
      .then(response => {
        console.log('Raspberry pi:', response.data);
        return status;
      })
      .catch(err => {
        console.warn(err)
      });


    }

    render(){
      return (
        <div>
        <Camera
        audio={false}
        screenshotFormat="image/jpeg"
        ref={this.setRef}
        />

        <div className='photos'>
          <div className='controls'>
            <button onClick={this.buttonClick}>Check</button>
          </div>
          {this.state.photo ? <img src={this.state.photo} /> : null}
        </div>


      </div>
      )

    }

    }
