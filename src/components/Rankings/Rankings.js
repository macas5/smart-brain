import React from 'react'
import './Rankings.css'

const Rankings = () => {
  return (
    <div>
      <h1>Current user ranks:</h1>
      <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
        <li className="ph3 tl pv2 bb flex b--light-silver">
          <span className='mr-auto'>1. Mac</span> <span>50</span></li>
        <li className="ph3 tl pv2 bb flex b--light-silver">
          <span className='mr-auto'>2. John</span> <span>25</span></li>
        <li className="ph3 tl pv2 bb flex b--light-silver">
          <span className='mr-auto'>3. Ann</span> <span>13</span></li>
      </ul>
    </div>
  )
}

export default Rankings;