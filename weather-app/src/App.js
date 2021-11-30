
import React, { useState } from "react";
const api={
  key:"4b0fbf61cf9ccca685e4ae78b3765025",
  base:"https://api.openweathermap.org/data/2.5/"
}
var  month=new Date().toLocaleString('default',{month:'short'})+" ";
var  date=new Date().getDate().toLocaleString();
var year=new Date().toLocaleString('default',{year:'numeric'})

var day=new Date().toLocaleString('default',{weekday:'long'} );
const  wholedate= day+", "+date+" "+month+" "+year;




function App() {
  const [Query,setQuery]=useState('')
  const [weather,setWeather]=useState({})

  const search= evt=>{ 
    if(evt.key==="Enter"){
      // const url=`api.openweathermap.org/data/2.5/weather?q=${Query}&appid=${api.key}`;
      const url=`${api.base}weather?q=${Query}&units=metric&APPID=${api.key}`;
      fetch(url).then(res=>res.json())
      .then(result =>{
        setWeather(result)
        setQuery(''); 
        console.log(result);
      } 
      );
    }
  }
 
  return (
    
    <div className={(typeof(weather.main)!="undefined" )?
     ( ((weather.main.temp)>16) ? 'app-warm' :"app"  )
     : 'app'
    }
    >
    <main>
    <div className="search-box">
      <input type="text" className="search-bar"
        placeholder="Search..."
        onChange={  e=>setQuery(e.target.value) }
        
        value={Query}
        onKeyPress={search}
      />
    </div>
    {(typeof weather.main !="undefined") ? (

    <>
    <div className="location-box">
    <div className="location">{weather.name} ,{weather.sys.country}</div>
    <div className="date">{wholedate}</div>
    </div>
    <div className="weather-box">
      <div className="temp">
      {Math.round(weather.main.temp)}°C
      </div>
      <div className="weather">{weather.weather[0].main}</div>
    </div>
    </>
    ):('')}
    </main>
      
    </div>
    
  );
  
}

export default App;
