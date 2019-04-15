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
