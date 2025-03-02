import React, { useEffect, useState } from 'react'

import './App.css'
import searchIcon from "./assets/search.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/heavy-rain.png";
import humidityIcon from "./assets/humidity_3.png";
import snowIcon from "./assets/snowy.png";
import sunIcon from "./assets/sun.png";
import windIcon from "./assets/wind-turbine.png";


const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind }) => {
  console.log(lat,log);
  return(<>
  <div className='image'>
    <img  style={{height:'100px',width:'100px',padding:'10px'}} src=  {icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
  <div>
    <span className='lat'>lattitude</span>
    <span>{lat}</span>
  </div>
  
  <div>
    <span className='log'>longitude</span>
    <span>{log}</span>
  </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img style={{width:'100px',height:'100px, '}} src={humidityIcon} alt="humidity" 
      className='icon' />
      <div className='data'>
       <div className="humidity-percent">{humidity}%</div>
       <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img style={{width:'100px',height:'100px'}} src={windIcon} alt="wind" 
      className='icon' />
      <div className='data'>
       <div className="wind-percent">{wind}km/h</div>
       <div className="text">Wind</div>
      </div>
    </div>
    
  </div>
  </> )
};



function App() {
  let api_key ="be475611106d0999407ba3674acecc53"

  const [text, setText] = useState("Chennai")
 const[icon, setIcon] = useState(snowIcon);
 const[temp, setTemp] = useState(0);
 const[city, setCity] = useState("chennai");
 const[country, setCountry] = useState("IN");
 const[lat, setLat] = useState(0);
 const[log, setLog] = useState(0);
 const[humidity,setHumidity] = useState(0)
 const[wind, setWind] = useState(0)

 const [cityNotFound, setCityNotFound] = useState(false);
 const [loading, setLoading] = useState(false);

const weatherIconMap ={
  "01d" : sunIcon,
  "01n" : sunIcon,
  "02d" : cloudIcon,
  "02n" : cloudIcon,
  "03d" : drizzleIcon,
  "03n" :drizzleIcon,
  "04d" : drizzleIcon,
  "04n" : drizzleIcon,
  "09d" : rainIcon,
  "09n" : rainIcon,
  "10d" : rainIcon,
  "10n" : rainIcon,
  "13d" :snowIcon,
  "13n" :snowIcon,

}


 const search=async () =>{
    
  setLoading(true);

  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
 
  try{

  let res = await fetch(url);
  let data =await res.json();
  console.log(data.name);
  if(data.cod==="404"){
    console.error("city not found");
    setCityNotFound(true);
    setLoading(false);
    return;
  }

  setHumidity(data.main.humidity);
  console.log(data.wind.speed);
  setWind(data.wind.speed);
  setTemp(Math.floor(data.main.temp));
  // console.log(data.name);
  setCity(data.name);
  setCountry(data.sys.country)
  setLat(data.coord.lat);
  setLog(data.coord.lon);
  console.log(data.coord);

  const weatherIconCode = data.weather[0].icon;
  setIcon(weatherIconMap[weatherIconCode] || sunIcon);
  setCityNotFound(false)

  }catch(error){
    console.error("An error occured:",error.message);
  } finally{
    setLoading(false);

  }

 };
const handleCity = (e)=>{
  setText(e.target.value);

};
const handleKeyDown = (e)=> {
  if (e.key==="Enter"){
    search();
  }
};

useEffect(function () {
  search();
},[]);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text"
          className='cityInput'
          placeholder='search City' 
          onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={()=> search()}>
            <img style={{width:'20px',height:'20px'}} src={searchIcon} alt="search" />
          </div>
        </div>
        <WeatherDetails  icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>
      </div>

    </>
    
  )
}

export default App;
