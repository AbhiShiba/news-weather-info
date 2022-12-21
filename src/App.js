import { useEffect, useState } from "react";
import "./App.css";
import { language, country } from "./component/dataSet/DataSet";
import DisplayNewsInfo from "./component/displayInfo/DisplayNewsInfo";
import Weather from "./component/displayInfo/Weather";
import DropDown from "./component/DropDown/DropDown";
import Loader from "./component/Loader/Loader";
// 6723a221868f4289938145702221712
// news - pub_147910be21aeca937f5fa297365486df74531
function App() {
  

 
  const [loaderStatus,setLoaderStatus] = useState(false);
  const [displayNewsData, setDisplayNewsData] = useState([]);

  

  const newsApi = {
    url: "https://newsdata.io/api/1/news?",
    key: "pub_147910be21aeca937f5fa297365486df74531",
  };

  const [changeLang,setChangeLang] = useState("en");
  const [changeCountry,setChangeCountry] = useState("in");
 
  const changeEventLanguage = (l) => {
    //console.log(l);
    setChangeLang(l);
  }

  const changeEvenCountry = (l) => {
    //console.log(l);
    setChangeCountry(l);
  }

  

  useEffect(() => {
    const newsApiCall = async () => {
      let url = `${newsApi.url}apiKey=${newsApi.key}&country=${changeCountry}&language=${changeLang}&category=technology,sports,environment`;
      const response = await fetch(url);
       setLoaderStatus(response.ok);
      const newsData = await response.json();
   
      setDisplayNewsData(newsData.results);
    }
    newsApiCall();
  }, [changeCountry,changeLang,newsApi.url,newsApi.key])

  // lat={location.Latitude} log={location.Longitude}
  // console.log(location); 

  const displayNews = (d) => {
    return d.map((info, index) => {
      if (info.description === null) {
        return "";
      }

      return (
        <DisplayNewsInfo
          dataName={info.title}
          dataDescription={info.description}
          dataImage={info.image_url}
          yesKey={index}
        />
      );
    });
  };

  return (
    <div className="App">
      <div className="left-container">
        <div className="btnInfo">
          <h1 id="newsheading">News</h1>
          <div id="drop">
            <DropDown Country="Language" langInfo={language} checkEvent={changeEventLanguage}/>
            <DropDown Country="Country" langInfo={country} checkEvent={changeEvenCountry} />
          </div>
        </div>
        <div className="info" key="uniqe">{loaderStatus ? displayNews(displayNewsData) : <Loader/>}
      </div>
      </div>
      <div className="right-container">
        <h1 id="w-info">Weather</h1>
        <Weather />
      </div>
    </div>
  );
}

export default App;
