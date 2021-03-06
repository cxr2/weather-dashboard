import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WeatherInfo.css";

const API_ENDPOINT =
  "https://api.weatherapi.com/v1/current.json?key=69439bd952804a09a75182714222606&q=London&aqi=no";

function WeatherInfo() {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData();
    // getData()
  }, []);

  const loadData = async () => {
    await fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((receivedData) => setData(receivedData));
    setLoaded(true);
  };

  // console.log(data);
  if (!isLoaded) {
    return (
      <>
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row py-5 d-flex justify-content-center align-items-center">
          <h1>
            {data.location.name}, {data.location.country}
          </h1>
          <div className="col-4">
            <img
              src={data.current.condition.icon}
              alt="weather icon"
              width="150"
            ></img>
          </div>
          <div className="col-4">
            <h2 className="currenttemp">{data.current.temp_c}°C</h2>
          </div>
          <div className="col-4">
            <ul>
              <li>Wind: {data.current.wind_mph} mph</li>
              <li>Humidity: {data.current.humidity}</li>
              <li>Precipitation: {data.current.precip_mm}mm</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// const defaultState = {
//   data: [], // default starting data.
//   loaded: false, // flag to show we are done or not.
//   isLoading: false, // 'flag' to tell me we're currently calling the server
//   error: null, // placeholder for any errors
// };

// function WeatherInfo() {
//   // console.count("rerender");

//   // OUR STATE
//   const [state, setState] = useState(defaultState);

//   const { error, isLoading, data, loaded } = state;

//   // USEFUL FUNCTIONS FOR CHANGING DIFFERENT BITS OF THE STATE
//   const setLoaded = useCallback(
//     (loadedState) => {
//       setState({
//         ...state,
//         loaded: loadedState,
//       });
//     },
//     [state]
//   );

//   const setLoading = useCallback(
//     (loadingState) => {
//       setState({
//         ...state,
//         isLoading: loadingState,
//       });
//     },
//     [state]
//   );

//   const setError = useCallback(
//     (err) => {
//       setState({
//         ...state,
//         isLoading: false,
//         loaded: true,
//         error: err,
//       });
//     },
//     [state]
//   );

//   const setData = useCallback(
//     (items) => {
//       setState({
//         ...state,
//         isLoading: false,
//         loaded: true,
//         error: null,
//         data: items,
//       });
//     },
//     [state]
//   );

//   // THE FUNCTION THAT ACTUALLY DOES THE CALL (LOOK HERE CAREFULLY!!!)
//   const fetchData = async () => {
//     // IF we have already run this and there is a fetch call in progress, then stop
//     // this is not that necessary in this example, but it is just good practice to prevent re-renders sending multiple calls.
//     if (isLoading) {
//       console.log("abandoming because call in flight");
//       return;
//     }

//     // So, it's the first time, so we set loading to true so that no more fetch calls can be made
//     setLoading(true);
//     console.log("calling");

//     try {
//       const response = await fetch(API_ENDPOINT);
//       if (!response.ok) throw response;
//       const data = await response.json();
//       console.log("got data");
//       // WE GOT DATA, so stick it in the state and let the list render
//       setData(data);
//     } catch (err) {
//       console.log("got error");
//       // We got an error, so stick it in the state and let the error display happen
//       setError(err);
//     }
//   };

//   // THE useEffect that triggers the call if we're in the browser and we haven't loaded
//   // This should run just once. We use the 'loaded' flag to make sure and to allow reloads if we change it
//   useEffect(() => {
//     console.log("useEffect called. loaded was", loaded);
//     if (!loaded) {
//       console.log("making the call");
//       fetchData();
//     } else {
//       console.log("useEffect but no fetch happened because loaded", loaded);
//     }
//   }, [fetchData, loaded]); // ignore exhaustive-deps warning here

//   // THE DIFFERENT UI STATES
//   // Loading
//   if (isLoading) return <p>Loading!!</p>;

//   // Errored
//   if (error)
//     return (
//       <>
//         <p>{error.status || error.message}</p>
//         <button onClick={() => setLoaded(false)}>Try again</button>
//       </>
//     );
//   // Success

//   return (
//     <>
//       <div className="container">
//         <div className="row py-5 d-flex justify-content-center align-items-center">
//           <h1>
//             {data.location.name}, {data.location.country}
//           </h1>
//           <div className="col-4">
//             <img
//               src={data.current.condition.icon}
//               alt="weather icon"
//               width="150"
//             ></img>
//           </div>
//           <div className="col-4">
//             <h2 className="currenttemp">{data.current.temp_c}°C</h2>
//           </div>
//           <div className="col-4">
//             <ul>
//               <li>Wind: {data.current.wind_mph} mph</li>
//               <li>Humidity: {data.current.humidity}</li>
//               <li>Precipitation: {data.current.precip_mm}mm</li>
//             </ul>
//           </div>
//           {data.location.localtime}
//         </div>
//       </div>
//     </>
//   );
// }

export default WeatherInfo;
