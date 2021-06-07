API="http://localhost:4741"
URL_PATH="/questions"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "question": {
      "question": "'"${QUESTION}"'",
      "rightAnswer": "'"${RANSWER}"'",
      "wrongAnswer": ["'"${WANSWER}"'", "'"${WANSWER2}"'"],
      "quizId": "'"${QUIZ_ID}"'"
    }
  }'

  echo