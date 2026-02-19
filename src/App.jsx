import { useState } from "react";
import "./index.css";

function App() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const[locError,setLocError] = useState(null);
  const [locationText, setLocationText] = useState("");
  const [currentTemp, setCurrentTemp] = useState(null);
  let locationErrorMessage = null;
  const handleSubmit = async () => {
    if (!phone.trim()) return;
    try {
      // locationWeather();
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const body = await res.json();
      setStatus(res.ok ? `Saved as ${body.phoneNumber}` : body.error);
      alert("Thank you for your submission!")
    } catch (err) {
      console.error(err);
      setStatus("Network error");
    }
  };

const locationWeather = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
    );

    const body = await res.json();

    if (body?.current?.temperature_2m !== undefined) {
      setCurrentTemp(body.current.temperature_2m);
    }

  } catch (err) {
    console.log(err);
  }
};


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else { 
      alert("Error Geolocation is not supported by this browser.");
    }
  }

  function error(err) {
    setLocError("Unable to output weather without location!");
  }
  if (locError) {
    locationErrorMessage = <p className="error">{locError}</p>;
  }
function success(position) {
  const { latitude, longitude } = position.coords;

  setLat(latitude);
  setLong(longitude);

  setLocationText(
    `Latitude: ${latitude}, Longitude: ${longitude}`
  );

  setLocError(null);

  locationWeather(latitude, longitude);
}

  return (
    <>
      <h1><span>Defrost</span></h1>
      <div className="register">
        <div class="phone-input">
          <label htmlFor="phone-number" id="userPrompt">
            Enter a Phone Number:
            <input
              id="phone-number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
          </label>
        </div>
        <button className="btn" onClick={handleSubmit}>
          Sign up
        </button>
        {status && <p>{status}</p>}
        <br></br>
        <button className="btn" onClick={getLocation}>
          Get Location
        </button> 
        {<p className="error">{locationErrorMessage}</p>}
        <p>{locationText}</p>
        {currentTemp !== null && (
        <div className="weather-card">
          <h2>{currentTemp}°F</h2>
          <p>Current Temperature</p>
        </div>
      )}
      </div>
    </>
  );
}

export default App