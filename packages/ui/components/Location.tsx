import * as React from "react";

function Location() {
  const [currentCity, setCurrentCity] = React.useState("");
  React.useEffect(() => {
    // Use the Geolocation API to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Get the user's latitude and longitude
        const { latitude, longitude } = position.coords;

        console.log(latitude, longitude);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();
        console.log(data);
        // Use a service or library to convert latitude and longitude to a city
        // For simplicity, we'll set a default city name
        if (data && data.address && data.address.city) {
          console.log(data.address);
          setCurrentCity(data.address.state_district);
        } else {
          setCurrentCity("Location not found");
        }
      });
    }
  }, []);
  return <div>{currentCity}</div>;
}

export default Location;
