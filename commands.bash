# To create a project
firebase projects:create "test1" --display-name "tesretjebr"

# To transfer ownership 
gcloud projects add-iam-policy-binding khushal-test1-12345 --member="user:sindhav.1@iitj.ac.in" --role="roles/editor"

# List apps
firebase apps:list --project khushal-test2-123

# Create app
firebase apps:create web "myApp" --project khushal-test2-123

# get appId
firebase apps:list --project khushal-test2-123 | awk '/myApp/{print $4}' > app_id.txt

# get config
echo "{" > firebase_config.json && firebase apps:sdkconfig WEB $(cat app_id.txt) | awk '/{/,/};/{if ($0 !~ /initializeApp/) print $0}' | sed 's/});/}/' >> firebase_config.json >> fir
ebase_config.json

