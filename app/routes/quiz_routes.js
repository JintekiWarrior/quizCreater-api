const express = require('express')

// Require quiz model
const Quiz = require('./../models/quiz.js')

// Require any custom error handlers.
// `handle404` error occurs if the client passes an ID that isn't in the database.
// `requireOwnership` will be defined in any route that uses `requireToken`
const { handle404, requireOwnership } = require('./../../lib/custom_errors.js')

// require passport for authentication purposes
const passport = require('passport')

// assigns the router method to the express middleware.
const router = express.Router()

// require the token we will use to give ownership to the quizes
const requireToken = passport.authenticate('bearer', { session: false })

// Create a quiz using the Quiz schema
// You will do this by storing the data in a new variable quizData
// You will then create a request using your mongoose schema and the express
// method create() to print a status if successful and print the contents
// of the creation.
//
// Create POST request
router.post('/quizzes', requireToken, (req, res, next) => {
  // adds the user id to a new object `owner` which we can use to signify
  // who owns the quiz created.
  req.body.quiz.owner = req.user._id
  const quizData = req.body.quiz

  Quiz.create(quizData)
    .then(quiz => {
      res.status(200).json({ quiz })
    })
    .catch(next)
})

// Create an index of all the quizzes created by the user. This will not require
// a token for authentication as anyone will be able to view the quizzes any user
// created.
// This is done by using the find() method on the `quiz` schema then sending a
// response of everything found in the schema database.
//
// Index GET request
router.get('/quizzes', (req, res, next) => {
  Quiz.find()
    .then(quiz => res.json({ quiz }))
    .then(() => res.sendStatus(200))
    .catch(next)
})

// Allow the user to update a quiz if they are the ones who own it.
// We will first delete the incoming owner on the data, then we will find
// the user by their id. After we will set up a `handle404` in case no id
// is found. Then we will use the requireOwnership() method to prove that
// the owner making the update is the one that is supposed to be. Lastly
// we will return the updated quiz getting storing the new data added.
//
// Update PATCH request
router.patch('/quizzes/:id', requireToken, (req, res, next) => {
  delete req.body.quiz.owner
  const id = req.params.id
  Quiz.findById(id)
    .then(handle404)
    .then(quiz => {
      requireOwnership(req, quiz)
      return quiz.updateOne(req.body.quiz)
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

// Delete a quiz created by the user. Will require token as only users who have
// created the quiz can delete it.
// Will need to acquire the id of the quiz from the url parameter, then add a
// findById() method to the quiz. Use a `404handle` to check for errors in the
// id. After use requireOwnership() method to make sure the owner of the quiz
// is in fact the owner. After use the deleteOne() method to delete the quiz
// and send a status message of 204.
//
// Destroy DELETE request
router.delete('/quizzes/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Quiz.findById(id)
    .then(handle404)
    .then(quiz => {
      requireOwnership(req, quiz)
      quiz.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Export the router middleware
module.exports = router
