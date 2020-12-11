import React from 'react'
import './StopInfo.css'

const StopInfo = ({ isInfoLoading, stopInfo }) => {
    return (
        <div
          style={{
            background: '#fafafa',
            boxShadow: '0px 0px 12px rgba(0,0,0,.15)',
            width: '34%',
          }}
        >
          <h1>Stop Info</h1>
          {!stopInfo.stop ? (isInfoLoading ? <p>Loading...</p> : <p>Select a stop.</p>)
          : (isInfoLoading ? <p>Loading...</p>
            : (<div className="stops-list">
              <h3>{stopInfo.stop.name}</h3>
              <p>Status: {stopInfo.status}</p>
              <br />
              <h4>Departures:</h4>
              <ul>
                {stopInfo.departures.map((departure, index) => {
                  return (
                    <li key={index}>
                      <p>From: {departure.from}</p>
                      <p>To: {departure.to}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
    )
}

export default StopInfo
