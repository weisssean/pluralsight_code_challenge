import React from 'react';
import {Grid, Typography} from "@material-ui/core/es";

const AboutView = () => {
  return <Grid container spacing={16}>
    <Grid item xs={false} sm={2}/>

    <Grid item xs={12} sm={8}>
      <Typography variant="h3" gutterBottom>
        About this challenge
      </Typography>
      <Typography variant="h5" gutterBottom align={"left"}>
        Backend
      </Typography>
      <Typography paragraph align={"left"}>
        For this exercise I decided to start with a React Redux application served from an express server. <br/>
        For data storage I used a simple json server that has row editing capabilities, as well as sorting and
        pagination. I normally would only use such a database for development purposes. <br/>

        Retrieving the data was fairly simple, so I chose not to go with a csv parser and create my own in
        data/dataparse.js.<br/> <br/>
      </Typography>
      <Typography variant="h5" gutterBottom align={"left"}>
        Frontend
      </Typography>
      <Typography paragraph align={"left"}>

        My application's UX was structured using react-router in combination with material-ui. <br/>
        As for communication with the database, I used the axios library to handle my restful API
        requests. <br/> <br/>
      </Typography>
      <Typography variant="h5" gutterBottom align={"left"}>
        Next Steps:
      </Typography>
      <Typography paragraph align={"left"}>

        If I were to hypothetically continue working on this exercise, I would work on improving the next steps:
      </Typography>
      <ol style={{textAlign: "left"}}>
        <li>Redux Middleware for handling our http calls</li>
        <li>Unit tests and integrated testing for github</li>
        <li>Responsive UX improvements</li>
        <li>More documentation using jsdocs and API publishing</li>
        <li>User sessions and analytics</li>
      </ol>
    </Grid>
    <Grid item xs={false} sm={2}/>

  </Grid>
};

export default AboutView;
