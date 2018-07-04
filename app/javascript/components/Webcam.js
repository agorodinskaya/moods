import React, {Component} from 'react';
import ReactWebCamCapture from 'react-webcam-capture';

if(location.protocol !== 'https:' && location.hostname !== 'localhost') {
  console.warn('getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.')
}

if(!navigator.mediaDevices && !navigator.getUserMedia) {
  console.warn(`Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.`)
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

// var MediaStream = window.MediaStream || window.webkitMediaStream
// if(typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
//   MediaStream.prototype.stop = () => {
//     this.getAudioTracks().forEach((track) => {
//       track.stop()
//     })
//
//     this.getVideoTracks().forEach((track) => {
//       track.stop()
//     })
//   }
// }


class Webcam extends Component {
  constructor(props){
    super(props);
    this.state={
      asked: false,
      permission: false,
      available: false,
      recording: false,
      paused: false
    }
  }

  stream = null
  mediaRecorder = null
  mediaData = []

  componentDidMount() {
    this.getUserMedia()
  }

  componentWillUnmount() {
    this.mediaRecorder = null
    this.mediaData = []

    this.stream.stop()
    this.stream = null
  }

  handleSuccess = (stream) => {
    if(this.props.autoPlay) {
      this.props.setStreamToVideo(stream)
    }
    this.stream = stream
    this.mediaData = []

    this.setState({
      permission: true,
      asked: true,
      recording: false
    })

    this.props.onGranted()

    this.initMediaRecorder()
  }

  handleFailed = (err) => {
    this.setState({ asked: false })
    this.props.onDenied(err)
  }

  getUserMedia = () => {
    const { constraints } = this.props

    if(navigator.mediaDevices) {
      console.log(navigator);
      navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 500, height: 500}},
      // not getting into the function below
      function(stream){
        var video = document.querySelector('video');
        console.log('...');
        video.srcObject = stream;
        video.onloadedmetadata = function(e){
          video.play();
        };
      },
        function(err){
          console.log("error:", err)
        })
    }else{
      console.log("Item not supported")
    }
      // navigator.mediaDevices.getUserMedia(constraints)
      //   .then(this.handleSuccess)
      //   .catch(this.handleFailed)
    // } else if(navigator.getUserMedia) {
    //   navigator.getUserMedia(constraints, this.handleSuccess, this.handleFailed)
    // } else {
    //   let errMessage = `Browser doesn't support UserMedia API. Please try with another browser.`
    //   console.warn(errMessage)
    //
    //   this.props.onError(new Error(errMessage))
    // }
  }

  initMediaRecorder = () => {
    // debugger;
    console.log('initMediaRecorder()');
    try {
      let options = {}
      let types = ['video/webm']

      if(this.props.mimeType) types.unshift(this.props.mimeType)

      for(let i = 0; i < types.length; i++) {
        let type = types[i]

        if(MediaRecorder.isTypeSupported(type)) {
          options.mimeType = type
          break;
        }

        console.warn(`${type} is not supported on your browser.`)
      }

      let mediaRecorder = new MediaRecorder(this.stream, options)

      mediaRecorder.ondataavailable = (ev) => {
        if(ev.data && ev.data.size > 0) {
          this.mediaData.push(event.data)
        }
      }
      console.log('got to HERE');
      this.mediaRecorder = mediaRecorder;

      this.setState({
        available: true
      })
    } catch(err) {
      console.log(err)
      console.error('Failed to initialize MediaRecorder.', err)

      this.setState({
        available: false
      })
    }
  }

  start = () => {
    console.log('start()');
    if(!this.state.available) return;
    console.log('got here START');
    this.mediaData = []
    this.mediaRecorder.start(this.props.timeSlice)

    this.setState({
      recording: true
    })

    this.props.onStart(this.stream)
    console.log(this.stream)
  }

  pause = () => {
    if(!this.state.recording) return
    this.mediaRecorder.stop()

    this.setState({ paused: true })

    this.props.onPause()
  }

  resume = () => {
    if(!this.state.recording) return
    this.initMediaRecorder()
    this.mediaRecorder.start(this.props.timeSlice)

    this.setState({ paused: false })

    this.props.onResume(this.stream)
  }

  stop = () => {
    if(!this.state.available) return

    this.mediaRecorder.stop()

    this.setState({
      recording: false
    })

    let blob = new Blob(this.mediaData, { type: 'video/webm' })
    this.props.onStop(blob)
    this.getUserMedia()
  }



  render() {
    return (
      <div>
      <h1>Video Recording Example</h1>


        <ReactWebCamCapture
          mimeType='video/webm'
          constraints={{ audio: false, video: true }}
          timeSlice={1}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onPause={this.handlePause}
          onResume={this.handleResume}
          onError={this.handleError}
          render={({ start, stop, pause, resume }) =>
          <div>
            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.pause}>Pause</button>
            <button onClick={this.resume}>Resume</button>

            <video autoPlay></video>
          </div>
        } />
      </div>
    )
  }
}

Webcam.defaultProps = {
  constraints: {
    audio: true,
    video: true
  },
  autoPlay: true,
  className: '',
  timeSlice: 0,
  mimeType: 'video/webm',
  setStreamToVideo: function() {},
  render: function() {},
  onGranted: function() {},
  onDenied: function() {},
  onStart: function() {},
  onStop: function() {},
  onPause: function() {},
  onResume: function() {},
  onError: function() {}
}
export default Webcam
