import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Weather() {
  const [getWeather, SetGetWeather] = useState({
    current: {
      condition: { text: "", icon: "" },
      humidity: "",
      is_day: 0,
      temp_c: "",
    },
    location: { country: "", name: "" },
  });

  const [disDate,setDisDate] = useState("");

  const apiUrl = {
    url: "http://api.weatherapi.com/v1",
    key: "6723a221868f4289938145702221712",
  };

  const [resState, setResState] = useState(false);

  useEffect(() => {
    const weatherInfo = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          // get user's location
          let pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          // get whether of user's location
          await fetch(
            `${apiUrl.url}/current.json?key=${apiUrl.key}&q=${pos.lat},${pos.lon}`
          )
            .then((res) => {
              setResState(res.ok);
              if (res.ok) return res.json();
              else throw new Error("Invalid location/city/country");
            })
            .then((result) => {
              // console.log(result);
              SetGetWeather(result);
            })
            .catch((error) => console.log(error));
        });
      }
    };
    weatherInfo();
  }, [apiUrl.key,apiUrl.url]);

  let day;
  let weekDay = new Date().getDay();
  switch (weekDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    default:
      day = "Saturday";
      break;
  }

setInterval(() => {
    let date = new Date();
    let H_val = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let M_val = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    let AmOrPm = date.getHours() < 12 ? 'AM' : 'PM';
    let H = H_val < 10 ? '0'+H_val : H_val;
    let fullTime = `${H} : ${M_val} : ${sec} ${AmOrPm}`;
    setDisDate(fullTime);
  })


  return (
    <>
    <div className="w-div-info">
      {!resState ? (
        <Loader/>
      ) : (
       <>
          <h1>
            {getWeather.current.temp_c}
            <span>&deg;C</span>
          </h1>
          <img
            id="w-icon"
            src={getWeather.current.condition.icon}
            alt="weather"
          />
          <p>{getWeather.current.condition.text}</p>
          <p>Humidity: {getWeather.current.humidity}</p>
          <p className="place">
            {getWeather.location.name},{getWeather.location.country}
          </p>
          
          </>
        
      )}
      <p className="disDate">{disDate} {day}</p>
      </div>
    </>
  );
}

export default Weather;
