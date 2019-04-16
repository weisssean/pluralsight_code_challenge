import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";

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
    };
    this.getQuestions();
  }

  getQuestions = () => {


    axios.get(`http://localhost:3004/questions?_sort=${this.props.sortBy}&_order=${this.props.orderBy}&_page=${this.props.page}&_limit=${this.props.rowPP}`)
      .then(response => {
        const total = response.headers["x-total-count"];
        this.props.actions.onLoadQuestions({questions:response.data, total: parseInt(total)});
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.sortBy !== this.props.sortBy ||
      prevProps.orderBy !== this.props.orderBy||
      prevProps.page !== this.props.page||
      prevProps.rowPP !== this.props.rowPP) {
      this.getQuestions();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavigationDrawer/>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  orderBy: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    onLoadQuestions: PropTypes.func.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    orderBy: state.orderBy,
    sortBy: state.sortBy,
    page:state.page,
    rowPP:state.rowPP,
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
