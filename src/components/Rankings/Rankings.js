import React from 'react'
import './Rankings.css'

 const Rankings = ({rankingsList, userRank, userEntries}) => {
  const list = rankingsList.slice(0, 10).map((entry, index) => {
      return (
        (entry.entries > 0) ?
          <li key={'li'+entry.id} className="ph3 tl pv2 bb flex b--light-silver">
          <span key={'spanl'+entry.id} className='w2'>{index + 1}. </span>
          <span key= {'spanm'+entry.id} className='mr-auto'>{entry.name}</span> 
          <span key={'spanr'+entry.id}>{entry.entries}</span></li>
        :
          <li key={'li'+entry.id} className="ph3 tl pv2 bb flex b--light-silver">
          <span key={'spanl'+entry.id} className='w2'>{index + 1}. </span>
          <span key={'spanm'+entry.id} className='mr-auto'></span> 
          <span key={'spanr'+entry.id}></span></li>
      );
  })

  document.title = "Rankings - Smart Brain";

  return (
    <div>
      <h1>
        {userEntries > 0?
          <p>Your current rank is: {userRank}</p>
        :
          <p>You need to have a score higher than 0 to get a rank</p>
        }
      </h1>
      <hr className= 'center mw6 light-silver'/>
      <h1>Current user standings:</h1>
      <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
        {list}
      </ul>
    </div>
  )
}  

export default Rankings;