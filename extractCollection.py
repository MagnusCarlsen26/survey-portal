import json

with open('db/backup.json', 'r') as file:
    data = json.load(file)

with open('data.json', 'w') as file:
    json.dump(data["__collections__"]["postSurveyQuestions"],file,indent=4)
