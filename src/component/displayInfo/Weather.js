import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Weather() {
  // const [getWeather, SetGetWeather] = useState({
  //   current: {
  //     condition: { text: "", icon: "" },
  //     humidity: "",
  //     is_day: 0,
  //     temp_c: "",
  //   },
  //   location: { country: "", name: "" },
  // });

  const [weather, setWeather] = useState({main:{temp: '', humidity : ""},name: '', sys: {country: ''}, weather: [{main: ''}]});


  const [disDate,setDisDate] = useState({time : "", date : ""});
  //const [check,setCheck] = useState(false);
  // const apiUrl = {
  //   url: "http://api.weatherapi.com/v1",
  //   key: "6723a221868f4289938145702221712",
  // };

  const weatherAPI = {
    key: "a64d07a306972de8e9f8c8267a9cc2c0",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [resState, setResState] = useState(false);

  useEffect(() => {
    // const weatherInfo = async () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(async (position) => {
    //       // get user's location
    //       let pos = {
    //         lat: position.coords.latitude,
    //         lon: position.coords.longitude,
    //       };
    //       // get whether of user's location
    //       await fetch(
    //         `${apiUrl.url}/current.json?key=${apiUrl.key}&q=${pos.lat},${pos.lon}`
    //       )
    //         .then((res) => {
    //           setResState(res.ok);
    //           if (res.ok){
                
    //             return res.json();} 
    //           else{
    //             //setCheck(!check);
    //             //console.log(check);
    //              throw new Error("Invalid location/city/country");
    //             }
    //         })
    //         .then((result) => {
    //           // console.log(result);
    //           SetGetWeather(result);
    //         })
    //         .catch((error) => console.log(error));
    //     });
    //   }
    // };
    // weatherInfo();

    const fetchWeather = async () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position) =>{
          // get user's location
          let pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude, 
          }
          // get whether of user's location
          await fetch(`${weatherAPI.base}weather?lat=${pos.lat}&lon=${pos.lon}&units=metric&appid=${weatherAPI.key}`)
          .then(res => {
            setResState(res.ok);
            if (res.ok)
              return res.json();
            else
              throw new Error('Invalid location/city/country');
          })
          .then(result => {
            setWeather(result);
            console.log(result);
          })
          .catch(error => console.log(error));
        });
      }
    }
    fetchWeather();
  }, [weatherAPI.key, weatherAPI.base]);

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
    let fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    setDisDate({
      time : fullTime,
      date : fullDate
    });
  })


  return (
    <>
    <div className="w-div-info">
      {!resState ? (
        <Loader/>
      ) : (
       <>
          <h1>
            {Math.round(weather.main.temp)}
            <span>&deg;C</span>
          </h1>

          <p>{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p className="place">
            {weather.name}, {weather.sys.country}
          </p>
          
          </>
        
      )}
      <p className="disDate">{disDate.time} {day}</p>
      <p className="disDate">{disDate.date}</p>
      </div>
    </>
  );
}

export default Weather;
