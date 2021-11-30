import { useState } from "react"

  const api = {
    key: '68f5b5e3610b861287a4a3dc10b88ad5',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if( evt.key === 'Enter' ){
      fetch( `${ api.base }weather?q=${ query }&units=metric&APPID=${ api.key }` )
        .then( resp   => resp.json() )
        .then( result => {
          setWeather( result )
          setQuery('')
          console.log( result )
        })
    }
  }

  const dateBuilder = d => {
    
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    
    let days  = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]

    let day   = days[ d.getDay() ]
    let date  = d.getDate()
    let month = months[ d.getMonth() ]
    let year  = d.getFullYear() 

    return `${ day } ${ date } ${ month } ${ year }`

  }

  const translator = estadoNubes => {

    switch (estadoNubes) {
      case 'Clear':
        return 'Despejado'

      case 'Clouds':
        return 'Nublado';
    
      case 'Mist':
        return 'Niebla';
      
      case 'Rain':
        return 'Lluvia';
      
      case 'Snow':
        return 'Nieve';

      default:
        break;
    }
  }

  return (
    <div className={
      ( typeof weather.main != 'undefined' )  
        ? (( weather.main.temp > 16 ) ? 'app warm' : 'app' ) 
        : 'app' }
    >
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar"
            placeholder="Buscar..."
            onChange={ e => setQuery( e.target.value ) }
            value={ query }
            onKeyPress={ search }
          />
        </div>
        {( typeof weather.main != 'undefined' ) ? (
          <div>

            <div className="location-box">
              <div className="location">{ weather.name }, { weather.sys.country }</div>
              <div className="date">{ dateBuilder( new Date() ) }</div>
            </div>
            
            <div className="weather-box">
              <div className="temp"> 
                { Math.round( weather.main.temp ) } ºC
              </div>
              <div className="weather">
                { weather.weather.map( 
                  item => <div key={ weather.dt }>{ translator( item.main ) }</div>
                )}
              </div>
              <div className="humidity">
                <span>Humedad: </span> { weather.main.humidity }%
              </div>
            </div>
            <div className="temps">
              <span className="temps__max">Temp. Max.: { Math.round( weather.main.temp_max ) } ºC</span> 
              <span className="temps__min"> Temp. Min.: { Math.round( weather.main.temp_min ) } ºC </span> 
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
