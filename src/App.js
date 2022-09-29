import logo from "./logo.svg";
import "./App.css";
import DropDown from "./components/DropDown";
import { useState } from "react";
import VideoComponent from "./components/VideoComponent/VideoComponent";

const options1 = ["Near", "Far"];
const options2 = ["Min", "Medium", "High"];
const options3 = ["Low", "Medium", "High", "Very High"];

const HEIGHT = 500;
const WIDTH = 500;
const VIDEO_FEED_CLASS = "app_video_feed";
function App() {
  const [playing, setPlaying] = useState(false);

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      { video: true },
      (stream) => {
        let video = document.getElementsByClassName(VIDEO_FEED_CLASS)[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };
  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName(VIDEO_FEED_CLASS)[0];
    video.srcObject.getTracks()[0].stop();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="items">
          <DropDown
            placeholder={"Camera Selection"}
            options={options1}
            tabIndex={0}
          />
          <DropDown
            placeholder={"Zoom Level"}
            options={options2}
            tabIndex={1}
          />
          <DropDown
            placeholder={"Resolution"}
            options={options3}
            tabIndex={2}
          />
          {!playing ? (
            <button className="primary-btn" onClick={startVideo}>
              Start
            </button>
          ) : (
            <button className="primary-btn" onClick={stopVideo}>
              Stop
            </button>
          )}
        </div>
      </header>
      <VideoComponent
        height={HEIGHT}
        width={WIDTH}
        classNames={VIDEO_FEED_CLASS}
      />
    </div>
  );
}

export default App;
