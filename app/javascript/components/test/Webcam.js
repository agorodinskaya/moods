// import React from 'react'
//
//
// require('tracking')
// require('tracking/build/data/face')
//
// export default class Camera extends React.Component {
//   state = {}
//
//   tracker = null
//
//   componentDidMount () {
//     this.tracker = new window.tracking.ObjectTracker('face')
//     this.tracker.setInitialScale(4)
//     this.tracker.setStepSize(2)
//     this.tracker.setEdgesDensity(0.1)
//
//     window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: true })
//     this.tracker.on('track', event => {
//       let context = this.refs.canvas.getContext('2d')
//       context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
//       event.data.forEach(function(rect) {
//         context.strokeStyle = '#a64ceb'
//         context.strokeRect(rect.x, rect.y, rect.width, rect.height)
//         context.font = '11px Helvetica'
//         context.fillStyle = "#fff"
//         context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
//         context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
//       })
//     })
//
//   }
//
//   componentWillUnmount () {
//     this.tracker.removeAllListeners()
//   }
//
//   render () {
//     return (
//       <div >
//         <div>
//           <video ref="cameraOutput" width="320" height="240" preload autoPlay loop muted></video>
//           <canvas ref="canvas" width="320" height="240"></canvas>
//         </div>
//       </div>
//     )
//   }
// }
