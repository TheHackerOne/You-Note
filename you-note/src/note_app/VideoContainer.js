import React, { useState, useEffect } from 'react'

import YouTube from 'react-youtube'
import { Grid, TextField, Card } from '@material-ui/core'

const VideoContainer = (props) => {
  const [videoLink, setVideoLink] = useState("");

  // parse video id from any youtube link type.
  const getVideoLink = () => {
    if(videoLink === "" || videoLink === undefined) return "";
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = videoLink.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  const onChange = (e) => {
    props.setVideoLink(e.target.value);
    setVideoLink(e.target.value);
  }

  useEffect(() =>{
    if(props.videoLink) {
      setVideoLink(props.videoLink)
      props.setVideoLink(props.videoLink);
    } else if(props.history.location.state) {
      setVideoLink(props.history.location.state.note.videoLink)
      props.setVideoLink(props.history.location.state.note.videoLink);
    }
    
  }, [props])

  return (
    <Grid 
      component={Card} 
      elevation={5} 
      alignItems='center' 
      justify='center' 
      item 
      container 
      direction='column' 
      xs={12} 
      md={6} 
      style={{marginBottom: '10px'}}>
        <Grid
          spacing={2}
          container 
          direction='column' 
          justify='space-between' 
          alignItems='stretch' 
          style={{padding: '10px', height: '100%'}} >
          <Grid item xs={12}>
            <TextField
              value={videoLink}
              name='videoLink' 
              placeholder='Enter a YouTube URL' 
              variant='outlined' 
              style={{width: '100%'}}
              onChange={(e) => onChange(e)}/>
          </Grid>
          {videoLink !== "" ? 
          <Grid item xs={12}>
            <YouTube 
              videoId={getVideoLink()}
              opts={{width: '100%'}}
              />
          </Grid> : null}
        </Grid>
    </Grid>
  )
}

export default VideoContainer;