#!/bin/bash

API="http://localhost:4741"
URL_PATH="/quizzes"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "quiz": {
        "title": "'"${TITLE}"'",
        "description": "'"${DESCRIPTION}"'"
      }
    }'

echo
