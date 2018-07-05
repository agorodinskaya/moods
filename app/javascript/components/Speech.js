import React, { PropTypes, Component } from 'react'
import axios from 'axios';



const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList


function upgrade() {

  showInfo('info_upgrade');
}


function showInfo(s) {
  console.log(s);

}


export default class Speech extends Component {
  constructor( props ){
    super(props);
    this.state = {
      content: '',
      speechText: '',
      interimText: '',
      recognizingInProgress: false,
      // recognition: false
    }
    this.toggleRecording=this.toggleRecording.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  componentDidMount(){

    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      // console.log('MOUNTED!');

      this.recognition = new webkitSpeechRecognition();
      this.speechRecognitionList = new webkitSpeechGrammarList();


      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-AU';
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.setState({recognizingInProgress: true, speechText: ''});
        showInfo('info_speak_now');

      };

      this.recognition.onerror = function(event) {
        if (event.error == 'no-speech') {

          showInfo('info_no_speech');

        }
        if (event.error == 'audio-capture') {

          showInfo('info_no_microphone');

        }
        if (event.error == 'not-allowed') {

        }
      };

      this.recognition.onend = () => {
        this.setState({recognizingInProgress: false});

      };

      this.recognition.onresult = (event) => {

        var interim_transcript = '';
        if (typeof(event.results) == 'undefined') {
          this.recognition.onend = null;
          this.recognition.stop();
          upgrade();
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            // final_transcript += event.results[i][0].transcript;
            this.setState({
              speechText: this.state.speechText + event.results[i][0].transcript,
              interimText: ''
            });
          } else {
            interim_transcript += event.results[i][0].transcript;
            // console.log('transcript:', interim_transcript);
            this.setState({ interimText: this.state.interimText + event.results[i][0].transcript });
            // set latest speech transcript in  to state
            // this.setState({ speechText: this.state.speechText + event.results[i][0].transcript })
          }
        }

      };
    }



  }
  toggleRecording(ev){
    if (this.state.recognizingInProgress) {
      this.recognition.stop();
      console.log('STOP');
      return;
    }else

    this.recognition.start();
    console.log('START');

  }

  handleChange(ev){
    this.setState({content: ev.target.value});

  }



  render(){
    return (


      <div>

      <form>
      <textarea onChange={this.handleChange} value={ this.state.speechText }></textarea>
      <br/>
      <button onClick={this.toggleRecording}><img src={this.state.recognizingInProgress ? "/assets/mic-animate.gif" : "/assets/mic.gif"} className="img-responsive"/></button>
      <style>{`body {background-color: ${this.state.speechText} }`}</style>

      </form>

      </div>

    );

  }
}
