import React, {useEffect, useState} from "react";
import Endpoints from "../util/Endpoints";
import GliderMap from "../components/GliderMap";
import StopInfo from "../components/StopInfo";

export default function Question3 (props) {
  //Displaying real-time metrics for our devices' locations and statuses is a critical component of our reporting strategy.
  // This allows us to provide accurate, live data to our clients.
  //
  // Using Translink's JourneyPlanner API, implement an MVP in React for a real-time reporting dashboard.
  // What exactly this consists of is up to you, but preferably it will include:
  // - A map component (or a *very* pretty table, lol)
  // - A way to locate/inspect stops
  // - A way to track buses
  // - Information about the routes available
  //
  // As Translink's JourneyPlanner API is supposedly quite complex and undocumented (surprise surprise!) you may find this package useful:
  // https://github.com/McPo/belfast-glider-api-server
  //
  // This file contains the map component and two endpoints to obtain Stop data.

  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState({});
  const [stopInfo, setStopInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  useEffect(() => {
    fetchStops();
  }, [])

  const fetchStops = async () => {
    setIsLoading(true)
    await fetch(Endpoints.STOPS)
      .then(res => res.json())
      .then(newStops => {
        if (newStops.stops.length) {
          setStops(newStops.stops);
          setIsLoading(false)
        }
      })
      .catch(e => console.log(e))
  }

  const fetchStopInfo = async (id) => {
    onSelectStop(id)
    setIsInfoLoading(true)
    await fetch(Endpoints.STOP_INFO + '/' + id)
      .then(res => res.json())
      .then(info => {
        setStopInfo(info)
        setIsInfoLoading(false)
      })
      .catch(e => console.log(e))
  }

  const onSelectStop = (id) => {
    setSelectedStop(stops.find(stop => stop.id === id))
  }

  return (
    <>
    {isLoading ? <p>Loading...</p>
      : <><div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', margin: '50px auto 0'}}>
        <div
          style={{ background: '#fafafa',
          boxShadow: '0px 0px 12px rgba(0,0,0,.15)',
          width: '64%'
        }}>
          <GliderMap
            selectedStop={selectedStop}
            fetchStopInfo={fetchStopInfo}
            stops={stops}
            googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkHRuOEvL8BERtTR0oIB-mw8e0QkMVA2U&v=3.exp&libraries=geometry,drawing,places'}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px`, width: '95%', margin: '25px auto' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <StopInfo
          isInfoLoading={isInfoLoading}
          stopInfo={stopInfo}
          stops={stops}
        />
      </div></>}
    </>
  );
}
