// import React, {Component} from 'react';
// import axios from 'axios';
//
// const SERVER_AUTH_TOKEN_URL = 'http://localhost:3000/user_token';
// export default class Login extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       err: ''
//     }
//   }
//
//   doLogin(){
//     axios.post(SERVER_AUTH_TOKEN_URL, {
//       auth: {email: this.email, password: this.password}
//     }).then( response => {
//       if( response.data.jwt ){
//         console.log(response.data);
//         console.log( this.decodeJWT(response.data.jwt) );
//
//         axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwt;
//         if( window.localStorage ){
//           localStorage.setItem('authToken', response.data.jwt)
//         }
//
//       }
//     })
//     .catch( err => {
//       console.warn('FAIL', err);
//       this.error = 'Invalid username or password.'
//     });
//
//   }
//
//   }
//   render(){
//     return (
//       <h1>Hello</h1>
//     )
//
//   }
//
//   }
