import React from 'react';
import {Grid, Typography} from "@material-ui/core/es";

const InstructionsView = () => {
  return <Grid container spacing={16}>
    <Grid item xs={0} sm={2}/>
    <Grid item xs={12} sm={8}>
      <Typography variant="h3" gutterBottom>
        Pluralsight Code Challenge
      </Typography>
      <Typography variant="h5" align="left">
        Background
      </Typography>
      <Typography paragraph align="left">
        Parsing and manipulating data, constructing endpoints to access data, and building JavaScript web interfaces are
        three tasks we commonly encounter. In this challenge we present you with a dump of questions that must be parsed
        and made accessible in a RESTful manner. Our goal is to gain an understanding of your design choices when
        attacking such problems.
      </Typography>
      <Typography variant="h5" align="left">
        Time
      </Typography>
      <Typography paragraph align="left">
        Please feel free to take as much time as you like to complete this challenge. That said, we recommend a
        turnaround of 3-10 days.
      </Typography>

      <Typography variant="h5" align="left">
        Objective
      </Typography>
      <Typography paragraph align="left">
        Parse the data dump and make the data accessible in a structured, RESTful API, with a JavaScript web client to
        consume that API. While we would prefer the API backend to be in either JavaScript or Python, please feel free
        to build it in any language of your choice. You may use any JavaScript library or framework you like to complete
        the front-end. A back-end database is not required, but you can use one if you wish.

      </Typography>

      <Typography variant="h5" align="left">
        Data Summary

      </Typography>
      <Typography paragraph align="left">
        This challenge should be accompanied with a csv file. If you did not receive one, please reach out to us. The
        csv data is tabular, with each column separated by a vertical pipe, '|'. The column headings are 'question',
        'answer' and 'distractors'. Each record represents a single multiple choice question. If multiple distractors
        (wrong answers) exist they are separated by a comma. Below is an example:

        question|answer|distractors
        What is 7343 - 6708?|635|688, 7171, 7023
      </Typography>

      <Typography variant="h5" align="left">
        Requirements
      </Typography>
      <Typography paragraph align="left">
        The API endpoint(s) should allow an end user to view a listing of all questions and perform two or more of the
        following operations:
        <ol>
          <li>Create a question</li>
          <li>Edit a question</li>
          <li>Delete a question</li>
          <li>Filter for a question</li>
          <li>Sort the questions</li>
          <li>Paginate the questions</li>
        </ol>

        *The end result should be runnable and demo-able. Your code should be in a git repo, and available online where
        you have committed through the process so that we can see your progress as you code the solution*.Please include
        instructions on how we can get it running locally, and you may also host your application on the Internet.
        Please feel free to reach out if you have any questions about the data, requirements, or anything else!
      </Typography>
    </Grid>
    <Grid item xs={0} sm={2}/>
  </Grid>
};

export default InstructionsView;


