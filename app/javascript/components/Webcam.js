import React, {Component} from 'react';
import Camera from 'react-webcam';
import axios from 'axios';
// import RNFS from 'react-native-fs'

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
    }


    buttonClick(){
        const photo = this.webcam.getScreenshot();


        this.setState({
          photo,
          status: true
        });
        console.log(photo, status);
        axios.post(K_ENROLL, {
          gallery_name: 'User',
            image: photo,
            subject_id: 'Test'
        }, {        headers: {
                    'Content-Type': 'application/json',
                    app_id: '',
                    app_key: ''
                }
            }).then((response) => {
              console.log('response:', response, response.data  );
                // this.setState({
                //     status: false
                // });
        })

    };



    render() {
        return (
          <div>
           <h1>Webcamera:</h1>
           <Camera
             audio={false}
             // ?
             ref={node => this.webcam = node}
           />

             <h2>Photo</h2>
             <div className='photos'>
               <div className='controls'>
                 <button onClick={this.buttonClick}>Click</button>
               </div>
               {this.state.photo ? <img src={this.state.photo} /> : null}
             </div>
           </div>
       );
     }
   }
