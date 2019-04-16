import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionsReducer(state = initialState.questions, action) {
  let _questions = [];
  switch (action.type) {
    case types.LOAD_QUESTIONS_SUCCESS:

      return Object.assign({}, state, {
        questions: action.questions.questions,
        totalCount: action.questions.total
      });

    case types.SELECT_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        selectedQuestion: action.selected
      });

    case types.INSERT_QUESTION_SUCCESS:
      _questions = Object.assign([], state.questions);
      _questions.unshift(action.question);
      return Object.assign({}, state, {
        questions: _questions,
        totalCount: state.totalCount+1
      });


    case types.UPDATE_QUESTION_SUCCESS:
      _questions = Object.assign([], state.questions.filter(q => q.id !== action.question.id));
      _questions.unshift(action.question);
      return Object.assign({}, state, {
        questions: _questions
      });

    case types.DELETE_QUESTION_SUCCESS:
      _questions = state.questions.filter(q => q.id !== action.id);
      return Object.assign({}, state, {
        questions: _questions,
        totalCount: state.totalCount-1
      });

    case types.TOGGLE_SORT:
      const sortBy = state.sortBy !== "question" ? "question" : "answer";
      return Object.assign({}, state, {
        sortBy
      });

    case types.TOGGLE_ORDER:
      const orderBy = state.orderBy !== "asc" ? "asc" : "desc";
      return Object.assign({}, state, {
        orderBy
      });

    case types.SET_PAGE:
      return Object.assign({}, state, {
        page:action.page
      });

    case types.SET_ROW_PER_PAGE:
      return Object.assign({}, state, {
        rowPP:action.rowPP
      });


    default:
      return Object.assign({}, state);
  }
}
