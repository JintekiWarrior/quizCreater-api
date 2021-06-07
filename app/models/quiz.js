const mongoose = require('mongoose')

// require the question schema
const questionSchema = require('./question.js')

const Schema = mongoose.Schema

const quizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Reference relationship to the user of the application
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [questionSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Quiz', quizSchema)
