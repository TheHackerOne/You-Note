import React from 'react';
import { Grid, Typography, Button, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { withRouter, Redirect } from 'react-router-dom'
import { useAuth } from '../auth/auth';


const theme = createMuiTheme();

theme.typography.h1 = {
  [theme.breakpoints.down('sm')]: {
    fontSize: '2em',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4em',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '6rem',
  },
};

const LandingPage = (props) => {

  const { username } = useAuth();

  if(username) {
    return <Redirect to='/home'/>
  }

  const handleOnClick = (dest) => {
    props.history.push({
      pathname: dest
    })
  }

  return (
    <Grid container item xs={12} direction='column' justify='center' alignItems='center' style={{height: '100%', overflow: 'hidden'}}>
      <Grid item container direction='column' alignItems='center' justify='center' xs={8}>
        <ThemeProvider theme={theme}>
          <Typography variant='h1' color='primary' style={{marginBottom: '20px'}}>
            <strong>Take Notes While You</strong>
            <br/>
            <strong>Watch YouTube Tutorials!</strong>
          </Typography>
        </ThemeProvider>
        <Button onClick={() => handleOnClick('/signup')} variant='contained' color='primary' style={{width: '33%', margin: '10px'}}>Sign Up</Button>
        <Button onClick={() => handleOnClick('/login')} variant='outlined' color='primary' style={{width: '33%'}}>Login</Button>
      </Grid>
    </Grid>
  )

}

export default withRouter(LandingPage);