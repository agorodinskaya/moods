import React, {Component} from 'react';
import Camera from 'react-webcam';

export default class Webcam extends Component {

    constructor(props){
      super(props);
      this.state = {
        screenshot: null,
        tab: 0
      }
      this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(){
      const screenshot = this.webcam.getScreenshot();
      this.setState({ screenshot });

    };

    render() {
        return (
          <div>
           <h1>react-webcam</h1>
           <Camera
             audio={false}
             ref={node => this.webcam = node}
           />
           
             <h2>Screenshots</h2>
             <div className='screenshots'>
               <div className='controls'>
                 <button onClick={this.buttonClick}>Click</button>
               </div>
               {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
             </div>
           </div>
       );
     }
   }
