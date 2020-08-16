const srvFetch = (target, method, body) => {
  return (fetch(`${process.env.REACT_APP_BACK_END_LOCATION}/${target}`,  {
      method: `${method}`,
      headers: {'Content-Type': 'application/json'},
      ...(method !== 'GET' && {body: JSON.stringify({ ...body })})
    })
    .then(response => {
      if (response.status === 400){
        return false;
      } else {
        return response.json();
      }
    })    
  )
}

export default srvFetch;