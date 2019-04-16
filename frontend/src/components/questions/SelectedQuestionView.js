import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {withStyles} from '@material-ui/core/styles';
import {updateQuestion} from '../../actions/questionActions';
import * as types from "../../actions/actionTypes";
import {bindActionCreators} from "redux";
import {Grid, TextField, Typography} from "@material-ui/core/es/index";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  descriptionHolder: {
    textAlign: 'left',
    margin: '20px 0 20px 0',
    cursor: "pointer"
  },
  displayText: {
    fontSize: 18
  },
  description: {
    textAlign: 'left',
    fontSize: 14,
    color: 'gray'
  }
});

class SelectedQuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editQuestion: false,
      editAnswer: false,
      selectedQuestion: props.selectedQuestion,
      question: props.selectedQuestion ? props.selectedQuestion.question : "",
      answer: props.selectedQuestion ? props.selectedQuestion.answer : ""
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    /**componentWillReceiveProps is deprecated so instead I used getDerivedStateFromProps
     * to handle change in selectedQuestion*/
    if (nextProps.selectedQuestion !== prevState.selectedQuestion) {
      return {
        selectedQuestion: nextProps.selectedQuestion,
        question: nextProps.selectedQuestion? nextProps.selectedQuestion.question:"",
        answer: nextProps.selectedQuestion? nextProps.selectedQuestion.answer:""
      };
    }
    else return null;
  }

/**
 * @function onSubmitQuestion - submits the changes
 * <ol>
 * <li>gets the updated state
 * <li>calls an update action
 * <li>closes the edit boxes
 * </ol>
 * */
  onSubmitQuestion = () => {
    const {question, answer, selectedQuestion} = this.state;
    const questionToEdit = Object.assign({}, selectedQuestion, {question, answer});
    this.props.actions.updateQuestion(questionToEdit);
    this.setState({editQuestion: false, editAnswer: false});
  };

/**
 * @function updateFormState - updates the state with the newly typed data
 * <ol>
 * <li>gets the name of the input ('question' or 'answer')
 * <li>sets the value to the state object
 * </ol>
 * */
  updateFormState = (event) => {
    const field = event.target.name;
    const form = {[field]: event.target.value};
    this.setState(form);
  };

  render() {
    const {classes, selectedQuestion} = this.props;
    if (selectedQuestion)
      return (
        <div className={classes.root}>

          <Grid container spacing={16}>
            <Grid item xs={8} sm={8}>
              {this.state.editQuestion ?
                <TextField
                  className={classes.search}
                  id="standard-full-width"
                  name="question"
                  label="Question"
                  placeholder="Type your question here"
                  helperText="Click outside the box to submit"
                  fullWidth
                  margin="normal"
                  defaultValue={this.state.question}
                  onChange={this.updateFormState}
                  onBlur={this.onSubmitQuestion}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> : <div className={classes.descriptionHolder} onClick={() => {
                  this.setState({editQuestion: true})
                }}>
                  <span className={classes.description}><small>Question</small></span>
                  <div className={classes.displayText}
                  >
                    {this.state.question?this.state.question:"Click here to edit this question"}
                  </div>
                  <span className={classes.description}><small>Click to edit</small></span>
                </div>

              }

              {this.state.editAnswer ?
                <TextField
                  className={classes.search}
                  id="standard-full-width"
                  name="answer"
                  label="Answer"
                  placeholder="Type your answer here"
                  helperText="Click outside the box to submit"
                  fullWidth
                  margin="normal"
                  defaultValue={this.state.answer}
                  onChange={this.updateFormState}
                  onBlur={this.onSubmitQuestion}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> : <div className={classes.descriptionHolder} onClick={() => {
                  this.setState({editAnswer: true})
                }}>
                  <span className={classes.description}><small>Answer</small></span>
                  <div className={classes.displayText}
                  >
                    {this.state.answer?this.state.answer:"Click here to edit this answer"}
                  </div>
                  <span className={classes.description}><small>Click to edit</small></span>
                </div>
              }
            </Grid>
            <Grid item xs={4} sm={4}>
            </Grid>
          </Grid>
        </div>
      );
    else
      return <Typography variant="h3" gutterBottom>
        Select a question from the list
      </Typography>
  }
}


const mapStateToProps = state => {
  return {
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
        updateQuestion
      },
      dispatch
    )
  };
}


SelectedQuestionView.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedQuestion: PropTypes.object,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(SelectedQuestionView));


