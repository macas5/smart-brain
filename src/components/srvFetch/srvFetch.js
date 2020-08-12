const srvFetch = (target, method, body) => {
  return (fetch(`https://agile-hollows-89259.herokuapp.com/${target}`,  {
      method: `${method}`,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ ...body })
    })
    .then(response => response.json())
  )
}

export default srvFetch;