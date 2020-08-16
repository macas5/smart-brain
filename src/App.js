import React from 'react';
import Particles from 'react-particles-js';
import Validator from 'validator';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Score from './components/Score/Score';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Rankings from './components/Rankings/Rankings'
import srvFetch from './components/srvFetch/srvFetch'
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [{}],
  route: 'signin',
  isSignedIn: false,
  errorMsg: '',
  rankingsList: [{}],
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name:data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation =(data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions.map( face => {
      const box = face.region_info.bounding_box;
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    })
    return clarifaiFace
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    if (Validator.isURL(this.state.input)){
      this.setState({errorMsg: ''});
      srvFetch('imageurl', 'post', {input: this.state.input})
      .then(response => {
        if (response) {
          srvFetch('image', 'put', {id: this.state.user.id})
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
    } else {
      this.setState({errorMsg: 'Please put in correct photo URL'});
    }
  }

  onEnterPress = (event) => {
    if (event.key === 'Enter') this.onButtonSubmit();
  }

  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({route: 'signin'});
      this.setState(initialState);
    } else {
      if (route === 'home') {
        this.setState({isSignedIn: true});
      }
      this.updateRankingsList();
      this.setState({route: route});
    }
  }

  updateRankingsList = () => srvFetch('rankings', 'GET')
  .then(response => {
    this.setState({rankingsList: response.map(x => x)}) ;
  })

  render(){
    const {isSignedIn, imageUrl, route, box, rankingsList, user, errorMsg} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'
        ?
          <div>
            <Logo />
            <Score name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onEnterPress={this.onEnterPress}/>
            <FaceRecognition box={box} imageUrl={imageUrl} errorMsg={errorMsg}/>
          </div>
        :
          route === "signin"?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
            route === "register"?
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
              <Rankings rankingsList={rankingsList}/>  
        }
      </div>
    );
  }
}

export default App;