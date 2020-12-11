import FuzzySearch from 'fuzzy-search';
import React, { useState, useEffect } from 'react';

const shoppingList = [
  'Peanut Butter',
  'Peas',
  'Butter',
  'Beans',
  'Eggs',
  'Quiche',
  'Cheese'
];

export default function Question2 () {

  const [searchText, setSearchText] = useState('');
  const [results, setResults] = React.useState([])

  useEffect(() => {
    setResults(shoppingList)
}, [])

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)

    if (e.target.value === '') {
      setResults(shoppingList)
    } else {
        const searcher = new FuzzySearch(shoppingList, {
            sort: true,
        });

        setResults(searcher.search(e.target.value))
    }
  }

  return (
    <div>
      <input value={searchText} onChange={handleSearchTextChange} type="text"/>
      {results.map(item => {
        return (
          <div>
            {item}
          </div>
        )
      })}
    </div>
  )
}
