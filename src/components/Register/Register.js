import React from 'react';
import srvFetch from '../srvFetch/srvFetch';
import passwordStrength from 'check-password-strength';
import isValid from '../validator/validator'

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      pswStrength: 'Weak',
      errorMsg: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    if (event.target.value){
      this.setState({password: event.target.value, 
        pswStrength: passwordStrength(event.target.value).value});
    }
  }

  onSubmitRegister = () => {
    const { name, email, password } = this.state;
    const validation = isValid (email, password, name, true);
    if (validation > 0) {
      srvFetch('register', 'post', {
        name: name, email: email, password: password})
      .then(user => {
        if (user) {
          this.setState({errorMsg: ''});
          this.props.loadUser(user);
          this.props.onRouteChange('signedin');
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
        case -3:
          this.setState({errorMsg: 'You must enter correct name format'});
          break;
        default:
          this.setState({errorMsg: 'Unexpected error'});
      }
    }
  }

  onEnterPress = (event) => {
    if (event.key === 'Enter') this.onSubmitRegister();
  }

  render(){
    return(
      <article className="mv4 w-100 mw6-ns center">
        <main className="br3 ba b--black-10 shadow-5 mh5-ns pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba mw5 b--transparent ph0 mh0 center">
              <legend className="f2 f1-ns fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onKeyPress={this.onEnterPress} onChange={this.onNameChange} 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" name="name"  id="name" />
              </div>
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
                type="password" name="password"  id="password" 
                title="Password must contain at least 6 characters of which at least 
                1 must be a number" />
              </div>
              <div>
                <p>Password strength: {this.state.pswStrength}</p>
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitRegister} 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" value="Register" />
            </div>
            <div className="lh-copy mt3" />
            <div><p className="mb0 red">{this.state.errorMsg}</p></div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;