const srvFetch = (target, method, body) => {
  return (fetch(`${process.env.REACT_APP_BACK_END_LOCATION}/${target}`,  {
      method: `${method}`,
      headers: {'Content-Type': 'application/json'},
      ...(method !== 'GET' && {body: JSON.stringify({ ...body })})
    })
    .then(response => {
      if ([400, 404, 500].includes(response.status)){
        return false;
      } else if (response.status === 409) return -1
      else {
        return response.json();
      }
    })    
  )
}

export default srvFetch;