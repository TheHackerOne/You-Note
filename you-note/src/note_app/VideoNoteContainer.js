import React from 'react'
import { Grid } from '@material-ui/core'
import VideoContainer from './VideoContainer';
import NoteContainer from './NoteContainer';
import { withRouter } from 'react-router-dom';

const VideoNoteContainer = (props) => {

  let videoLink = "";
  let urlBase = "api/notes/";

  const save = async (note) => {
    const {id, title, body, author, type } = note;
    let url = urlBase;

    if(type === 'PUT') {
      url += id;
    }

    let reqBody = JSON.stringify({
      title: title,
      body: body,
      author: author,
      videoLink: videoLink
    });

    const response = await fetch(url, {
      method: type,
      headers: {
        'content-type' : 'application/json',
        'x-auth-token' : localStorage.getItem('token')
      },
      body: reqBody
    });

    const json = await response.json();
    props.history.push({pathname: '/home'})
  }

  const setLink = (link) => {
    videoLink = link;
  }

  return (
    <Grid 
      container 
      direction='row' 
      justify='space-around'
      alignItems='center' 
      style={{maxHeight: '100%', height: '100%', padding: '10px'}}>
        <VideoContainer setVideoLink={(link) => setLink(link)} {...props}/>
        <NoteContainer {...props} handleSave={(note) => save(note)}/>
    </Grid>
  )
}

export default withRouter(VideoNoteContainer);