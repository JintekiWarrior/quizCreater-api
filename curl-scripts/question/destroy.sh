API="http://localhost:4741"
URL_PATH="/questions"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --data '{
    "question": {
      "quizId": "'"${QUIZ_ID}"'"
    }
  }'

  echo
