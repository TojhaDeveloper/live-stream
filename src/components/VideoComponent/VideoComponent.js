import React from "react";
import styles from "./videocomponent.module.css";

function VideoComponent({ height, width, classNames }) {
  return (
    <div className={styles.container}>
      <video
        autoPlay
        muted
        height={height}
        width={width}
        className={classNames}
      ></video>
    </div>
  );
}

export default VideoComponent;
