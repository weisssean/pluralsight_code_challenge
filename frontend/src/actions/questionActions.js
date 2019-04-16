import * as types from './actionTypes';
import axios from "axios/index";

export function insertQuestionSuccess(question) {
  return {type: types.INSERT_QUESTION_SUCCESS, question};
}

export function updateQuestionSuccess(question) {
  return {type: types.UPDATE_QUESTION_SUCCESS, question};
}

export function deleteQuestionSuccess(id) {
  return {type: types.DELETE_QUESTION_SUCCESS, id};
}

function selectQuestion(selected) {
  return {type: types.SELECT_QUESTION_SUCCESS, selected};
}

/**
 * @function insertQuestion - for inserting a blank new question
 * <ol>
 * <li>posts the questions to the server.
 * <li>dispatches an insert action.
 * <li>dispatches a select action for the new question.
 * </ol>
 * @return {function} dispatch - the call for this function
 * */
export const insertQuestion = question => {
  return dispatch => {
    axios.post(`http://localhost:3004/questions/`, question)
      .then(response => {
        console.log(response);
        dispatch(insertQuestionSuccess(question));
        dispatch(selectQuestion(question));
      })
      .catch(error => {
        console.log(error);
      });

  }
};

/**
 * @function updateQuestion - for inserting a blank new question
 * <ol>
 * <li>puts the questions to the server.
 * <li>dispatches an update action.
 * </ol>
 * @return {function} dispatch - the call for this function
 * */
export const updateQuestion = question => {
  return dispatch => {
    dispatch(selectQuestion(question));
    axios.put(`http://localhost:3004/questions/${question.id}`, question)
      .then(response => {
        console.log(response);
        dispatch(updateQuestionSuccess(question))
      })
      .catch(error => {
        console.log(error);
      });

  }
};

/**
 * @function deleteQuestion - for inserting a blank new question
 * <ol>
 * <li>deletes the questions from the server.
 * <li>dispatches a delete action.
 * </ol>
 * @return {function} dispatch - the call for this function
 * */
export const deleteQuestion = questionId => {
  return dispatch => {
    dispatch(selectQuestion(null));
    axios.delete(`http://localhost:3004/questions/${questionId}`)
      .then(response => {
        console.log(response);
        dispatch(deleteQuestionSuccess(questionId))
      })
      .catch(error => {
        console.log(error);
      });

  }
};
