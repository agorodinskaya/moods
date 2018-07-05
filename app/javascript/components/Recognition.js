import React, {Component} from 'react';
import Camera from 'react-webcam';
import Mood from './Mood'
import Speech from './Speech'
import axios from 'axios';

const K_VERIFY = 'https://api.kairos.com/recognize';

export default class Recognition extends Component {
    constructor(props){
      super(props);
      this.state={
        photo: null,
        status: false,
        username: '',
        email:'',
        errors: ''

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
          app_id, app_key
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
          this.setState({username: response.data.user.name, face_id: response.data.user.k_face_id});

        }else{
          this.setState({username:''})
        }

      })
      .catch(err => {
        console.warn(err)
      })
    };




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

        </div>


        {this.state.face_id ?
          <div>
          {this.state.username}

          <Mood/>
          <Speech/>
          </div>:
          <p id="message">
          "Please Login using Recognize Button or SignUp to enroll your picture"
          </p>}





      </div>
      )

    }

    }
