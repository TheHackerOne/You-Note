import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
import { useAuth } from './auth';
import { Redirect, withRouter, Link } from 'react-router-dom';

const AuthForm = (props) => {

  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign In");
  const { setUsername, setAuthToken, username } = useAuth();

  const authenticate = async () => {
    const basePath = 'api/auth/';
    let url = basePath;

    if(action === "Sign In") {
      url += "login";
    }
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type' : 'application/json' },
      body: JSON.stringify({username: name, password})
    });

    const json = await response.json();
    if(response.ok) {
      setAuthToken(json.token);
      setUsername(json.user.username);
    } else {
      alert(json.msg);
    }
  }
  
  useEffect(() => {
    if(props.action) {
      setAction(props.action);
    } else {
      if(props.location.pathname === '/signup') {
        setAction("Sign Up")
      } else {
        setAction("Sign In");
      }
    }
  }, [props]);

  const components = [
    <TextField 
      placeholder="Username" 
      name='username' 
      value={name} 
      onChange={(e) => setUserName(e.target.value)}/>,
    <TextField 
      type='password' 
      placeholder="Password" 
      name='password' 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}/>,
      <Button variant='contained' color='primary' onClick={() => authenticate()}>{action}</Button>,
      
  ]

  if(username) {
    return <Redirect to='/home'/>
  }

  return (
    <Grid container direction='row' item xs={12} justify='center' alignItems='center' style={{height: '100%'}}>
      <Grid
        container
        direction='column'
        alignItems='stretch'
        justify='center'
        component={Card}
        item 
        spacing={3}
        xs={8}
        md={4}
        style={{padding: '20px'}}>
        <Grid container item xs={12} justify='center'>
          <Typography variant='h3'>{action}</Typography>
        </Grid>
        {components.map(component => {
          return(
            <Grid container direction='column' item xs={12} alignItems='stretch'>
              {component}
            </Grid>
          )
        })}
        {action === 'Sign In' ? 
          <Link to='/signup'>Don't Have an Account? Sign Up</Link> : 
          <Link to='/login'>Already Have An Account? Sign In</Link>}
      </Grid>
    </Grid>
  )
}

export default withRouter(AuthForm);