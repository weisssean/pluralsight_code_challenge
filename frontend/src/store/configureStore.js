import {createStore, applyMiddleware} from "redux";
import questions from "../reducers/questionsReducer";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(
    questions,
    initialState,
    applyMiddleware(thunk)
  );
}
