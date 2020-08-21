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
  route: 'loading',
  isSignedIn: false,
  errorMsg: '',
  rankingsList: [{}],
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    rank: 0
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (accessToken) => 
    fetch(`${process.env.REACT_APP_BACK_END_LOCATION}/getuser`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken }
    })
    .then (response => response.json())
    .then (data => {
      if (data === "Invalid"){
        return false;
      } else {
        this.setState({ isSignedIn: true, user: {
          id: data.id,
          name:data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }})
      }
      return true;
    })

  calculateFaceLocation =(data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceBoxArray = data.outputs[0].data.regions.map( face => {
      const box = face.region_info.bounding_box;
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    })
    return faceBoxArray;
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
      srvFetch('imageurl', 'post', {input: this.state.input, userId: this.state.user.id})
      .then(response => {
        if (response.data && response !== -1) {
          this.displayFaceBox(this.calculateFaceLocation(response.data));
          this.setState(Object.assign(this.state.user, { entries: response.entries}));
        }
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
    switch (route) {
      case 'signedin':
        this.setState({isSignedIn: true});
        this.setState({route: 'home'});
        break;
        
      case 'rankings':
        this.updateRankingsList();
        this.setState({route: route});
        break;

      case 'signout':
        localStorage.removeItem('accessToken');
        this.setState(initialState);
        this.setState({route: 'signin'});
        break;
      
      default:
        this.setState({route: route});
        break;
    }
  }

  updateRankingsList = () => srvFetch('rankings', 'GET')
  .then(response => {
    let found = false;
    let i = 0;
    while (!found || i < response.length){
      if (response[i].id === this.state.user.id){
        Object.assign(this.state.user, {rank: i + 1});
        found = true;
      }
      i++;
    }
    this.setState({rankingsList: response.map(x => x)}) ;
  })

  componentDidMount() {
    if (localStorage.getItem('accessToken') === null){
      this.onRouteChange('signin');
    } else {
      if ((this.state.route === 'loading')){
        this.loadUser(localStorage.getItem('accessToken'))
        .then(response => {
          if (response) {
            this.onRouteChange('signedin');
          } else {
            localStorage.removeItem('accessToken');
            this.onRouteChange('signin');
          }
        })
      } 
    }
  }

  render(){
    const {isSignedIn} = this.state;
    const routeSelection = () => {
      const {imageUrl, route, box, rankingsList, user, errorMsg} = this.state;
      switch (route){
        case 'signin':
          return (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
  
        case 'home':
          return (
            <div>
              <Score name={user.name} entries={user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} onEnterPress={this.onEnterPress}/>
              <FaceRecognition box={box} imageUrl={imageUrl} errorMsg={errorMsg}/>
            </div>
          )
        
        case 'rankings':
          return (
            <Rankings rankingsList={rankingsList} userRank={user.rank} userEntries={user.entries}/>
          )
  
        case 'register':
          return (
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

        case 'loading':
          return (
            <div/>
          )
        default:
          return <p>There were some problems getting route</p>
      }
    }
    
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div className='flex flex-wrap justify-end flex-row-reverse'>
          {(this.state.route !== "loading") && 
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>}
          <Logo />
        </div>
        {routeSelection()}
      </div>
    );
  }
}

export default App;