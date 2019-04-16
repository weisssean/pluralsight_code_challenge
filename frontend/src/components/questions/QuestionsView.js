import React from 'react';
import QuestionsList from "../questions/QuestionsList";
import Grid from "@material-ui/core/es/Grid/Grid";
import SelectedQuestionView from "../questions/SelectedQuestionView";

const QuestionsView = ()=>{
  return  <Grid container spacing={16}>
            <Grid item xs={12} sm={5}>
              <QuestionsList/>
            </Grid>
            <Grid item xs={12} sm={7}>
              <SelectedQuestionView />
            </Grid>
          </Grid>
};

export default QuestionsView;
