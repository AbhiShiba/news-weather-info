import React from "react";
import './display.css';
import myImage from "../image/Image Not available.jpg"

function DisplayNewsInfo(props) {
//{props.dataImage}

let urlForimage = props.dataImage === null ? myImage : props.dataImage;
  return (
    <div key={"div" + props.dataIndex} id={props.dataIndex}>
      <h2 key={"h2" + props.dataIndex}>{props.dataName}</h2>
      <div className="img-p" key={"img-p" + props.dataIndex}>
        <p key={"p" + props.dataIndex}>{props.dataDescription}</p>
        <img
          key={"img" + props.dataIndex}
          src={urlForimage}
          alt={"image" + props.dataIndex}
        />
      </div>
    </div>
  );
}

export default DisplayNewsInfo;
