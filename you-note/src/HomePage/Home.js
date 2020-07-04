import React from 'react';
import NoteTable from './NoteTable';
import { Grid, Card, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import useFetch from '../util/APIFetch';
import { withRouter, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const Home = (props) => {

  const { username } = useAuth();

  const { data, loading } = useFetch("/api/notes/", {}, "GET");
  const newNote = () => {
    props.history.push({
      pathname: '/new'
    })
  }

  if(!username) {
    console.log(username);
    return <Redirect to='/login' />
  }

  return (
    <Grid 
      container 
      style={{width: '100%'}} 
      direction='column' 
      alignItems='center'>
      <Grid 
        item 
        md={8} 
        xs={10}
        component={Card} 
        container 
        elevation={5} 
        direction='row' 
        justify='space-between' 
        alignItems='center' 
        style={{margin: '40px'}}>
        <Grid item xs={12}>
        {loading ? null :
          <NoteTable {...data}/>
          }
        </Grid>
      </Grid>
      <Grid container direction='row' item xs={10} md={8} justify='flex-end'>
          <Fab color="primary" aria-label="edit" onClick={() => newNote()}>
            <EditIcon />
          </Fab>
        </Grid>
    </Grid>
  );
}

export default withRouter(Home);