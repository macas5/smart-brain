import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box, errorMsg}) => {
  if (!errorMsg.length) {
    const boundingBox = box.map((element, index) => <div key={index} className='bounding-box' 
    style={{top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol}}/>)
    return(
      <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputimage' src={imageUrl} alt ='' width='500px' height='auto'/>
          {boundingBox}
        </div>
      </div>
    );
  } else {
    return(
      <div className='center ma'>
        <p className='red'>{errorMsg}</p>
      </div>
    )
  }
}

export default FaceRecognition;