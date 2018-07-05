// import React from 'react';
// import ReactWebCamCapture from 'react-webcam-capture';
//
//
// export default class CamTest extends React.Component {
//
//   constructor(props){
//     super(props);
// 
//     this.state = {
//       url: ''
//     };
//
//     this.handleStop = this.handleStop.bind( this );
//   }
//
//     handleStop(blob){
//       // console.log('STOPPED', a, b, c); //this.mediaData);
//       // let blob = new Blob(this.mediaData, { type: 'video/webm' })
//       console.log('DONE', blob);
//       var downloadUrl = URL.createObjectURL(blob);
//        this.setState({ url: downloadUrl });
//     }
//
//     render() {
//       return (
//         <div ref='app'>
//
//        <h1>Video Recording Example</h1>
//        <a href={this.state.url} download="vid.webm" >DOWNLOAD</a>
//        <hr />
//
//        <ReactWebCamCapture
//         mimeType='video/mpeg'
//          constraints={{ audio: false, video: true }}
//          timeSlice={10}
//          onGranted={this.handleGranted}
//          onDenied={this.handleDenied}
//          onStart={this.handleStart}
//          onStop={this.handleStop}
//          onPause={this.handlePause}
//          onResume={this.handleResume}
//          onError={this.handleError}
//          render={({ start, stop, pause, resume }) =>
//          <div>
//
//            <button onClick={start}>Start</button>
//            <button onClick={stop}>Stop</button>
//            <button onClick={pause}>Pause</button>
//            <button onClick={resume}>Resume</button>
//
//            <p>Streaming test</p>
//            <video autoPlay></video>
//          </div>
//        } />
//      </div>
//       );
//       // console.log(this.props);
//       // return (
//       //   <div>
//       //     <p>CAMTEST</p>
//       //     <ReactWebCamCapture
//       //       mimeType='video/webm'
//       //       constraints={{ audio: false, video: true }}
//       //       timeSlice={1}
//       //       onGranted={this.handleGranted}
//       //       onDenied={this.handleDenied}
//       //       onStart={this.handleStart}
//       //       onStop={this.handleStop}
//       //       onPause={this.handlePause}
//       //       onResume={this.handleResume}
//       //       onError={this.handleError}
//       //       render={({ start, stop, pause, resume }) =>
//       //       <div>
//       //         <button onClick={this.start}>Start</button>
//       //         <button onClick={this.stop}>Stop</button>
//       //         <button onClick={this.pause}>Pause</button>
//       //         <button onClick={this.resume}>Resume</button>
//       //
//       //         <video autoPlay></video>
//       //       </div>
//       //     } />
//       //   </div>
//       // )
//     }
//   }
