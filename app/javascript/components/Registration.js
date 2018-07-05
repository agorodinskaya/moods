import React, {Component} from 'react';
import Camera from 'react-webcam';
import axios from 'axios';

const K_ENROLL = 'https://api.kairos.com/enroll';

export default class Register extends Component {

    constructor(props){
      super(props);
      this.state = {
        photo: null,
        status: false,
        username: '',
        email:''
      }
      this.buttonClick = this.buttonClick.bind(this);
      this.submitUser = this.submitUser.bind(this);
    }
    setRef = (webcam) => {
            this.webcam = webcam;
        }


    buttonClick(){
      const photo = this.webcam.getScreenshot();
      // logging the webcam initial data:
      // console.log(photo);
      this.setState({
        photo,
        status: true
      });
      // console.log(photo, status);
      axios.post(K_ENROLL, {
        gallery_name: 'TEST-1',
          image: photo,
          subject_id: this.state.username
      },
      {
        headers: {
          'Content-Type': 'application/json',
          app_id, app_key
      }})
      .then((response) => {
        console.log('response:', response, response.data  );
          this.setState({
              status: false
          })
          return axios.post('/users',{
            username: this.state.username,
            face_id: response.data.face_id
          })
      }).then(response => {
        console.log("Rails response:", response.data)

      })
      .catch(err => {
        console.warn(err)
      })

    };

    submitUser(event){

      this.setState({
        // setting the username and sending to Kairos:
        username: event.target.value
      })

    }

    checkLogin(){
      axios.get('/current_user').then( console.warn );
    }


    render() {
        return (
          <div>
           <h1>Please look in the camera to take the first picture:</h1>
           <Camera
             audio={false}
             screenshotFormat="image/jpeg"
             ref={this.setRef}
           />

             <h2>Your photo will be displayed in the below area when you press register button:</h2>
             <div>
               <div>
               <input onChange={(event) => this.submitUser(event) }>
               </input>
                 <button onClick={this.buttonClick}>Register</button>
               </div>
               {this.state.photo ? <img src={this.state.photo} /> : null}
               </div>
           </div>
       );
     }
   }
