// require express and mongoose
const express = require('express')
const mongoose = require('mongoose')

// require the quiz model
const Quiz = require('./../models/quiz.js')

// create router middleware
const router = express.Router()

// Create a question in the quiz. First store the request data in a variable.
// Then get the id for the quiz bieng given questions. Use the findById method.
// then use the question data and push it into the quiz arraywe created in the
// mongoose model. Print the status and changes after.
//
// create POST request
router.post('/questions', (req, res, next) => {
  const questionData = req.body.question
  const quizId = questionData.quizId
  Quiz.findById(quizId)
    .then(quiz => {
      quiz.questions.push(questionData)
      return quiz.save()
    })
    .then(quiz => res.status(201).json({ quiz }))
    .catch(next)
})
// To delete a child schema requires two items the parent schema `Quiz` id and
// the child schema `question` id. The question id will be found in the http
// request and obtained from there. The second will be in the data body. Once
// known you will findById the parent schema and remove by the id the child using
// the remove method. Then save the deletion, and send a 204 status.
//
// Destroy DELETE request
router.delete('/questions/:id', (req, res, next) => {
  const questionId = req.params.id
  const quizId = req.body.question.quizId
  Quiz.findById(quizId)
    .then(quiz => {
      quiz.questions.id(questionId).remove()
      return quiz.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update PATCH request
router.patch('/questions/:id', (req, res, next) => {
  const questionId = req.params.id
  const quizId = req.body.question.quizId
  const questionData = req.body.question
  Quiz.findById(quizId)
    .then(quiz => {
      const question = quiz.questions.id(questionId)
      question.set(questionData)
      return quiz.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
