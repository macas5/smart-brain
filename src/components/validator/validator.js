const isValid = (email, password, name = '', isRegister = false) => {
  const isValidEmail = (email) => {
    if ((email.includes('@')) && (email.includes('.')) && (email.length < 65) 
    && (email.length > 5) && (typeof email === 'string' || email instanceof String)) {
      return true;
    }
    return false;
  }  
  
  const isValidPassword = (password) => {
    if ((password.length > 5) && (password.length < 65) 
    && (/\d/.test(password)) && (/[A-Z a-z]/.test(password)) 
    // Lifted up some requirements for ease of testing 
    //(and you don't need that much of security for a website like this)
    // && (/[~`!#$%\-\^&*+=\[\]\\';,/{}|\\":<>\?]/.test(password))
    && (typeof password === 'string' || password instanceof String)){
      return true;
    }
    return false;
  }

  const isValidName = (name) => {
    if ((name.length > 1) && (name.length < 65) 
    && (!(/[\d~`!#$%&*+=[\]\\';,/{}|\\":<>?]/.test(name))) 
    && (typeof name === 'string' || name instanceof String)){
      return true;
    }
    return false;
  }
  
  if (isRegister) {
    return  (
      isValidEmail(email) ?
        isValidPassword(password) ?
          isValidName(name) ? true
          : -3
        : -2
      : -1
    )
  } else {
    return  (
      isValidEmail(email) ?
        isValidPassword(password) ? true
        : -2
      : -1
    )
  }
}

export default isValid;