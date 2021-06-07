'use strict'

// require mongoose
const mongoose = require('mongoose')

// set mongoose schema
const Schema = mongoose.Schema

// create a schema that creates questions and answers
const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  rightAnswer: {
    type: String,
    required: true
  },
  wrongAnswer: [{
    type: String,
    default: undefined,
    required: true
  }]
}, {
  timestamps: true
})

module.exports = questionSchema
