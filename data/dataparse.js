// index.js
const fs = require("fs");
const uuid = require("uuid");


  /**
   * @function getData - for aquiring the questions from the csv data file
   * <ol>
   * <li>get the file from the file system.
   * <li>split the lines by new line (\n)
   * <li>for each line, split by |
   * </ol>
   * @return {array} questions - an array of questions, answers and distractors
   * */
const getData = function () {
  const questions = [];

  const fileContents = fs.readFileSync('data/code_challenge_question_dump.csv', 'utf8');
  const lines = fileContents.toString().trim().split('\n');
  for (let i = 0; i < lines.length; i++) {
    questions.push(lines[i].toString().trim().split('|'));
  }
  return questions;
};

  /**
   * @function - for setting the file into the format of our json database likes
   * <ol>
   * <li>get the data rows.
   * <li>remove the header row
   * <li>for each row, create a javascript object: {question,answer, distractor, id}
   * </ol>
   * @return {object} questions - an array of javascript questions
   * */
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
