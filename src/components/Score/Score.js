import React from 'react';

const Score = ({name, entries}) => {
  return(
    <div>
      <div className='mh4 white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {`${entries}`}
      </div>
    </div>
  );
}

export default Score;