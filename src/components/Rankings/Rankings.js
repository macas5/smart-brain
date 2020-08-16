import React from 'react'
import './Rankings.css'

 const Rankings = ({rankingsList}) => {
  const list = rankingsList.map((entry, index) => 
    <li key={entry.id} className="ph3 tl pv2 bb flex b--light-silver">
    <span className='mr-auto'>{index + 1}. {entry.name}</span> <span>{entry.entries}</span></li>
  )
  return (
    <div>
      <h1>Current user ranks:</h1>
      <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
        {list}
      </ul>
    </div>
  )
}  

export default Rankings;