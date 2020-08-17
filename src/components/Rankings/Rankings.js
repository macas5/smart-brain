import React from 'react'
import './Rankings.css'

 const Rankings = ({rankingsList}) => {
  const list = rankingsList.map((entry, index) => {
      return (
        (entry.entries > 0) ?
          <li key={'li'+entry.id} className="ph3 tl pv2 bb flex b--light-silver">
          <span key={'spanl'+entry.id} className='mr-auto'>{index + 1}. {entry.name}</span> 
          <span key={'spanr'+entry.id}>{entry.entries}</span></li>
        :
          <li key={'li'+entry.id} className="ph3 tl pv2 bb flex b--light-silver">
          <span key={'spanl'+entry.id} className='mr-auto'>{index + 1}. aaa</span> 
          <span key={'spanr'+entry.id}></span>0</li>
      );
  })

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