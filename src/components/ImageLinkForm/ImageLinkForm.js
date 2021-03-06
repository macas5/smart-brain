import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit, onEnterPress}) => {
  return(
    <div className= 'ma4 mt0'>
      <p className='f3'>This Magic Brain will detect faces in your pictures. Give it a try</p>
      <div className='center'>
        <div className='center form pa4 br3 shadow-5 flex flex-wrap justify-center'>
          <input className='mv1 f4 pa2 fl-grow-7 center minwidth0' type='text'
           onKeyPress={onEnterPress} onChange={onInputChange} />
          <button className='grow mv1 f4 link ph3 pv2 dib white bg-light-purple minw120 fl-grow-3 mw-30'
          onClick={onButtonSubmit}>  Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
