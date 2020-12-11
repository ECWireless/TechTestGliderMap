import React, {useEffect, useState} from "react";
import Endpoints from "../util/Endpoints";
import GliderMap from "../components/GliderMap";
import StopInfo from "../components/StopInfo";

export default function Question3 () {
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState({});
  const [stopInfo, setStopInfo] = useState([]);
  const [stops, setStops] = useState([]);

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
