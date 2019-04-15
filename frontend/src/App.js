import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";

import axios from 'axios';
import PropTypes from 'prop-types';

import NavigationDrawer from "./components/shared/NavigationDrawer";
import * as types from './actions/actionTypes'
import {bindActionCreators} from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3004/questions?_page=0&_limit=200')
      .then(response => {
        console.log(response);
        this.props.actions.onLoadQuestions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <NavigationDrawer/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    questions: state.questions
  }
};



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onLoadQuestions: questions => ({
          type: types.LOAD_QUESTIONS_SUCCESS,
          questions
        })
      },
      dispatch
    )
  };
}


App.propTypes = {
  actions: PropTypes.shape({
    onLoadQuestions: PropTypes.func.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
