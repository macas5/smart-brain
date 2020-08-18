import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
    return (
      <div className='ml-auto fl-grow-99'>
        <nav className='flex justify-end flex-wrap'>
          <p onClick={() => onRouteChange('home')} 
          className='f3 link dim black underline pa3 pointer mb0'>Home</p>
          <p onClick={() => onRouteChange('rankings')} 
          className='f3 link dim black underline pa3 pointer mb0'>Rankings</p>
          <p onClick={() => onRouteChange('signout')} 
          className='f3 link dim black underline pa3 pointer mb0'>Sign Out</p>
        </nav>
      </div>
    );
  } else {
    return (
      <div className='ml-auto fl-grow-99'>
        <nav className='flex justify-end flex-wrap'>
          <p onClick={() => onRouteChange('signin')} 
          className='f3 link dim black underline pa3 pointer mb0'> Sign In</p>
          <p onClick={() => onRouteChange('register')} 
          className='f3 link dim black underline pa3 pointer mb0'> Register</p>
        </nav>
      </div>
    );
  }  
}

export default Navigation;