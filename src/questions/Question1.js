import React, { useState, useEffect } from 'react';

export default function Question1 () {

  const [ input, setInput ] = useState({
    title: '',
    body: '',
    id: 1337,
  })
  const [ errormessage, setErrorMessage ] = useState('');

  useEffect(() => {
    if (input.title === '') {
      setErrorMessage('You need to enter a title!')
    } else {
      setErrorMessage('')
    }
  }, [input.title]);

  const handleOnChange = (e) => {
      e.persist()

      setInput((prev) => ({
        ...prev,
        [e.target.id]: e.target.value
      }))
    }

  const handleSubmit = () => {
    if (input.title === '') {
      return
    }

    fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  return (
    <div>
      <div style={{ marginBottom: '10px'}}>
        <label htmlFor="title" style={{ marginRight: '5px'}}>
          Title:
        </label>
        <input
          id="title"
          value={input.title}
          name={input.title}
          onChange={handleOnChange}
        />
      </div>

      <div style={{ marginBottom: '10px'}}>
        <label htmlFor="body" style={{ marginRight: '5px'}}>
          Body:
        </label>
        <input 
          id="body"
          value={input.body}
          name={input.body}
          onChange={handleOnChange}
        />
      </div>

      <div style={{ marginBottom: '10px'}}>
        <label htmlFor="id" style={{ marginRight: '5px'}}>
          User ID:
        </label>
        <select
          id="id"
          value={input.id}
          name={input.id}
          onChange={handleOnChange}
        >
          <option>1337</option>
          <option>1234</option>
          <option>1066</option>
        </select>
      </div>

      <div>
        {errormessage}
      </div>

      <button onClick={handleSubmit} style={{margin: 10}}>Submit</button>
    </div>

  )
}
