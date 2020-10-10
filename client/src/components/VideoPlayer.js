
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import { Player } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css'


export default function VideoPlayer(props) {
  let video = props.video
  return (
    <Player ref={(player) => { console.log(player) }}
      playsInline
      poster={video.thumbnail}
      src="https://capstone-project-steven.s3-us-west-1.amazonaws.com/555/videos/VID_20201008_212621996.mp4"
    />
  );
};


// import React, { Component } from 'react';
// import { PrismCode } from 'react-prism';
// import { Player, ControlBar } from 'video-react';
// import '../../node_modules/video-react/dist/video-react.css'

// export default class VideoPlayer extends Component {
//     constructor(props) {
//         super(props);
    
//         this.state = {
//           source: sources.bunnyMovie
//         };
    
//         this.play = this.play.bind(this);
//         this.pause = this.pause.bind(this);
//         this.load = this.load.bind(this);
//         this.changeCurrentTime = this.changeCurrentTime.bind(this);
//         this.seek = this.seek.bind(this);
//         this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
//         this.changeVolume = this.changeVolume.bind(this);
//         this.setMuted = this.setMuted.bind(this);
//       }

//       componentDidMount() {
//         // subscribe state change
//         this.player.subscribeToStateChange(this.handleStateChange.bind(this));
//       }

//       handleStateChange(state, prevState) {
//         // copy player state to this component's state
//         this.setState({
//           player: state,
//           currentTime: state.currentTime
//         });
//       }
//       // currentTime Returns the current playback position in the video (in seconds)
//   return (
//     <Player
//       playsInline
//       poster="/assets/poster.png"
//       src="https://capstone-project-steven.s3-us-west-1.amazonaws.com/555/videos/VID_20201008_212621996.mp4"
//     />
//   );
// };
