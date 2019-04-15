import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {withStyles} from '@material-ui/core/styles';
import * as types from "../../actions/actionTypes";
import {insertQuestion, deleteQuestion} from '../../actions/questionActions';
import {bindActionCreators} from "redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  TextField,
  IconButton
} from "@material-ui/core/es/index";
import uuidv4 from "uuid/v4";

import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    width: '100%',
    padding: 8,
    backgroundColor: theme.palette.background.paper,
  },
});

class QuestionsList extends React.Component {
  state = {
    filterText: ""
  };

  onFilterChange = (e, e2) => {
    this.setState({filterText: e.target.value});
  };

  onInsertQuestion=()=>{
    const question= {
      id: uuidv4(),
      question: "Enter question here",
      answer: "Enter answer for your question"
    };
    this.props.actions.insertQuestion(question);
  };

  render() {
    const {classes, questions, selectedQuestion} = this.props;

    return (<div className={classes.root}>
        <TextField
          className={classes.search}
          id="standard-full-width"
          label="Questions"
          placeholder="Filter"
          helperText="Type to filter"
          fullWidth
          margin="normal"
          onChange={this.onFilterChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <List>
          <ListItem key={-1}
                    button
                    selected={false}
                    onClick={this.onInsertQuestion}>
            <ListItemText primary="+ Add Question"/>
          </ListItem>

          <Divider/>
          {questions.filter(q => q.question.includes(this.state.filterText))
            .map(item => (
              <ListItem key={item.id}
                        button
                        selected={selectedQuestion && selectedQuestion.id === item.id}
                        onClick={this.props.actions.onSelectQuestion.bind(this, item)}>
                <ListItemText primary={item.question}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete" onClick={this.props.actions.deleteQuestion.bind(this, item.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  classes: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  selectedQuestion: PropTypes.object,
  actions: PropTypes.shape({
    onSelectQuestion: PropTypes.func.isRequired,
    insertQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => {
  return {
    questions: state.questions,
    selectedQuestion: state.selectedQuestion,

  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onSelectQuestion: question => ({
          type: types.SELECT_QUESTION_SUCCESS,
          selected: question
        }),
        insertQuestion,
        deleteQuestion
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(QuestionsList));


