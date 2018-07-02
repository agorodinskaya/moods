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
        username: ''
      }
      this.buttonClick = this.buttonClick.bind(this);
      this.submitUser = this.submitUser.bind(this);
    }
    setRef = (webcam) => {
            this.webcam = webcam;
        }


    buttonClick(){
      const photo = this.webcam.getScreenshot();

      console.log(photo);
      this.setState({
        photo,
        status: true
      });
      console.log(photo, status);
      axios.post(K_ENROLL, {
        gallery_name: 'User',
          image: photo,
          subject_id: this.state.username
      }, {        headers: {
                  'Content-Type': 'application/json',
                  app_id: '048de122',
                  app_key: 'ff633fe82a3c8b6d0d85095c4aceac2f'
              }
          }).then((response) => {
            console.log('response:', response, response.data  );
              this.setState({
                  status: false
              });
      })

    };

    submitUser(event){

      this.setState({
        // set username:
        username: event.target.value
      })

    }



    render() {
        return (
          <div>
           <h1>Register:</h1>
           <Camera
             audio={false}
             screenshotFormat="image/jpeg"
             ref={this.setRef}
           />

             <h2>Photo</h2>
             <div className='photos'>
               <div className='controls'>
               <textarea onChange={ this.submitUser }>
               </textarea>
                 <button onClick={this.buttonClick}>Register</button>
               </div>
               {this.state.photo ? <img src={this.state.photo} /> : null}
             </div>
           </div>
       );
     }
   }
