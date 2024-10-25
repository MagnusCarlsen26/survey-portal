cd survey-portal/firebase
firebase deploy
gcloud functions add-invoker-policy-binding isAdminAccess --region="us-central1" --member="allUsers"
gcloud functions add-invoker-policy-binding isAccess --region="us-central1" --member="allUsers"
gcloud functions add-invoker-policy-binding helloWorld --region="us-central1" --member="allUsers"