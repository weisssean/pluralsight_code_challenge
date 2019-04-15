// index.js
const fs = require("fs");
const uuid = require("uuid");

const getData = function () {
  const questions = [];

  const fileContents = fs.readFileSync('data/code_challenge_question_dump.csv', 'utf8');
  const lines = fileContents.toString().trim().split('\n');
  for (let i = 0; i < lines.length; i++) {
    questions.push(lines[i].toString().trim().split('|'));
  }
  return questions;
};

module.exports = () => {
  const data = getData();

  const headers = data[0];
  const rows = data.slice(1);

  const questions = [];

  for (let i = 0; i < rows.length; i++) {
    let question = {};
    for (let j = 0; j < headers.length; j++) {
      question[headers[j]] = rows[i][j];
      question.id = uuid.v4();
    }
    questions.push(question);
  }

  return ({questions})
};
