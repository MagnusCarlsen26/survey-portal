firebase projects:create "$1" --display-name "$2"
gcloud projects add-iam-policy-binding $1 --member="user:$3" --role="roles/editor"
firebase apps:create web "myApp" --project $1
firebase apps:list --project $1 | awk '/myApp/{print $4}' > app_id.txt
echo "{" > firebase_config.json && firebase apps:sdkconfig WEB $(cat app_id.txt) | awk '/{/,/};/{if ($0 !~ /initializeApp/) print $0}' | sed 's/});/}/' >> firebase_config.json >> firebase_config.json
rm firebase_config.json app_id.txt

# ./commands.sh <project-id> <display-name> <owner-email>




