import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
    return (
      <div className='ml-auto'>
        <nav className='flex justify-end'>
          <p onClick={() => onRouteChange('home')} 
          className='f3 link dim black underline pa3 pointer'>Home</p>
          <p onClick={() => onRouteChange('rankings')} 
          className='f3 link dim black underline pa3 pointer'>Rankings</p>
          <p onClick={() => onRouteChange('signout')} 
          className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      </div>
    );
  } else {
    return (
      <div className='ml-auto'>
        <nav className='flex justify-end'>
          <p onClick={() => onRouteChange('signin')} 
          className='f3 link dim black underline pa3 pointer'> Sign In</p>
          <p onClick={() => onRouteChange('register')} 
          className='f3 link dim black underline pa3 pointer'> Register</p>
        </nav>
      </div>
    );
  }  
}

export default Navigation;