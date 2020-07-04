import { useState, useEffect } from 'react';

const useFetch = (url, body, TYPE) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOpts = {
    method: TYPE,
    headers: {
      'content-type': 'application/json',
      'x-auth-token' : localStorage.getItem('token')
    } 
  }

  const postOpts = {
    ...getOpts,
    body: body
  }

  const fetchApi = async (opts) => {
    const response = await fetch(url, opts);
    const data = await response.json();
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    console.log(url);
    if(TYPE === 'POST' || TYPE === 'PUT')
      fetchApi(postOpts);
    else
      fetchApi(getOpts);
  }, []);

  return {data, loading};

}

export default useFetch;