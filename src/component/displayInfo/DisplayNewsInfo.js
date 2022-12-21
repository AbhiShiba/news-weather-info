import React from "react";
import './display.css';
import myImage from "../image/Image Not available.jpg"

function DisplayNewsInfo(props) {
//{props.dataImage}

let urlForimage = props.dataImage === null ? myImage : props.dataImage;
  return (
    <div key={"div" + props.yesKey} id={props.yesKey}>
      <h2 key={"h2" + props.yesKey}>{props.dataName}</h2>
      <div className="img-p" key={"img-p" + props.yesKey}>
        <p key={"p" + props.yesKey}>{props.dataDescription}</p>
        <img
          key={"img" + props.yesKey}
          src={urlForimage}
          alt={"image" + props.yesKey}
        />
      </div>
    </div>
  );
}

export default DisplayNewsInfo;
