import React from 'react';
import srvFetch from '../srvFetch/srvFetch';
import isValid from '../validator/validator';

class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errorMsg: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state;
    const validation = isValid(signInEmail, signInPassword);
    if (validation > 0){
      srvFetch('signin', 'post', {email: signInEmail, 
        password: signInPassword})
      .then(response => {
        console.log(response);
        if(response && response !== -1){
          localStorage.setItem('accessToken', response.accessToken);
          this.props.loadUser(response.accessToken);
          this.props.onRouteChange('signedin');
        } else {
          this.setState({errorMsg: 'Incorrect username or password'});
        }
      })
    } else {
      switch (validation) {
        case -1:
          this.setState({errorMsg: 'You must enter correct email format'});
          break;
        case -2:
          this.setState({errorMsg: 'You must enter correct password format'});
          break;
        default:
          this.setState({errorMsg: 'Unexpected error'});
      }
    }
  }

  onEnterPress = (event) => {
    if (event.key === 'Enter') this.onSubmitSignIn();
  }

  componentDidMount = () => {
    document.title = "Sign In - Smart Brain";
  }

  render(){
    const { onRouteChange } = this.props;    

    return(
      <article className="mv4 w-100 mw6-ns center">
      <main className="br3 ba b--black-10 shadow-5 mh5-ns pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba mw5 b--transparent ph0 mh0 center">
            <legend className="f2 f1-ns fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onKeyPress={this.onEnterPress} onChange={this.onEmailChange} 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onKeyPress={this.onEnterPress} onChange={this.onPasswordChange} 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onSubmitSignIn} 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit" value="Sign In" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} 
            className="f6 link dim black db pointer">Register</p>
            <div><p className="mb0 red">{this.state.errorMsg}</p></div>
          </div>
        </div>
      </main>
    </article>
    );
  }
}

export default SignIn;