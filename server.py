import csv
import json

import json
import csv
import pytz
from datetime import datetime

from flask import Flask, send_file, after_this_request
import zipfile
import os
import subprocess

app = Flask(__name__)
global data

import datetime

def saveAdmins() :
    header = ['email']
    with open('db/admins.csv','w',newline='') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for uuid in data['__collections__']['admins'] :
            csv_writer.writerow([data['__collections__']['admins'][uuid]['email']])

def saveQuestions() :
    header = ['page','doctorId1','doctorId2','doctorId3','doctorId4','doctorId5','doctorId6']
    import json
    with open("questions.json", "w") as json_file:
        json.dump(data["__collections__"]["questions"], json_file, indent=4) 
    with open('db/questions.csv','w',newline='') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for page in data['__collections__']['questions'] :
            csv_writer.writerow([
                page,
                data['__collections__']['questions'][page]['doctors'][0]['id'],
                data['__collections__']['questions'][page]['doctors'][1]['id'],
                data['__collections__']['questions'][page]['doctors'][2]['id'],
                data['__collections__']['questions'][page]['doctors'][3]['id'],
                data['__collections__']['questions'][page]['doctors'][4]['id'],
                data['__collections__']['questions'][page]['doctors'][5]['id'],
            ])

def saveResponse() :
    header = ['uuid','responseId','qid','cat','timeToAttempt','ts']
    with open('db/response.csv','w',newline='') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for id in data['__collections__']['response'] :
            csv_writer.writerow([
                data['__collections__']['response'][id]['uuid'],
                data['__collections__']['response'][id]['responseId'],
                data['__collections__']['response'][id]['qid'],
                data['__collections__']['response'][id]['cat'],
                data['__collections__']['response'][id]['timeToAttempt'],
                data['__collections__']['response'][id]['ts'],
            ])

def saveUsers() :
    header = ['uuid','email','name','isAccess','surveyStatus','cat','completedAt','isDenyPhoto']
    with open('db/users.csv','w',newline='') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for uuid in data['__collections__']['users'] :
            csv_writer.writerow([
                data['__collections__']['users'][uuid]['uuid'],
                data['__collections__']['users'][uuid]['email'],
                data['__collections__']['users'][uuid]['name'],
                data['__collections__']['users'][uuid]['isAccess'],
                data['__collections__']['users'][uuid]['surveyStatus'],
                data['__collections__']['users'][uuid]['cat'],
                data['__collections__']['users'][uuid].get("completedAt","not completed"),
                data['__collections__']['users'][uuid]['isDenyPhoto'],
            ])

def savedone(): 
    header1 = [
        "age",
        "email",
        "familarity",
        "gender",
        "isFamilyDoctor",
        "rollNo",
        "timeToAttempt"
    ]
    header2 = [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Other member male",
        "Other member female",
        "timeToAttempt"
    ]
    header3 = [
        "lastTimeWhichDoctor",
        "timeToAttempt"
    ]
    header4 = [
        "doMaleDoctorMoreExperienced",
        "doMaleDoctorMoreSkilled",
        "doMaleDoctorPrefer",
        "timeToAttempt"
    ]

    with open('db/postSurveyQ1.csv', 'w', newline='') as file:
        csv_writer = csv.writer(file)
        l = ["uuid", "cat", "ts"]
        l.extend(header1)
        csv_writer.writerow(l)

    with open('db/postSurveyQ2.csv', 'w', newline='') as file:
        csv_writer = csv.writer(file)
        l = ["uuid", "cat", "ts"]
        l.extend(header2)
        csv_writer.writerow(l)

    with open('db/postSurveyQ3.csv', 'w', newline='') as file:
        csv_writer = csv.writer(file)
        l = ["uuid", "cat", "ts"]
        l.extend(header3)
        csv_writer.writerow(l)

    with open('db/postSurveyQ4.csv', 'w', newline='') as file:
        csv_writer = csv.writer(file)
        l = ["uuid", "cat", "ts"]
        l.extend(header4)
        csv_writer.writerow(l)


    for docuId in data['__collections__']['done']:
        done_doc = data['__collections__']['done'][docuId]
        uuid = done_doc.get('uuid', False)  
        cat = done_doc.get('cat', False)      
        ts = done_doc.get('ts', False)        


        if done_doc.get('qid') == "1":
            with open('db/postSurveyQ1.csv', 'a', newline="") as file:
                csv_writer = csv.writer(file)
                lst = [uuid, cat, ts]
                for header in header1:
                    lst.append(done_doc.get('form', {}).get(header, False))

                csv_writer.writerow(lst)

        if done_doc.get('qid') == "2":
            with open('db/postSurveyQ2.csv', 'a', newline="") as file:
                csv_writer = csv.writer(file)
                lst = [uuid, cat, ts]
                for header in header2:
                    lst.append(done_doc.get('form', {}).get(header, False))

                csv_writer.writerow(lst)

        if done_doc.get('qid') == "3":
            with open('db/postSurveyQ3.csv', 'a', newline="") as file:
                csv_writer = csv.writer(file)
                lst = [uuid, cat, ts]
                for header in header3:
                    lst.append(done_doc.get('form', {}).get(header, False))
                
                csv_writer.writerow(lst)

        if done_doc.get('qid') == "4":
            with open('db/postSurveyQ4.csv', 'a', newline="") as file:
                csv_writer = csv.writer(file)
                lst = [uuid, cat, ts]
                for header in header4:
                    lst.append(done_doc.get('form', {}).get(header, False))  # Default value for form fields

                csv_writer.writerow(lst)

def create_zip():
    with zipfile.ZipFile('backup.zip', 'w') as zipf:
        for foldername, subfolders, filenames in os.walk('db'):
            for filename in filenames:
                filepath = os.path.join(foldername, filename)
                zipf.write(filepath, os.path.basename(filepath))

@app.route('/downloadDb', methods=['GET'])
def download_zip():
    global data

    os.system("npx -p node-firestore-import-export firestore-export -a dbSecret.json -b db/backup.json")
    with open('db/backup.json', 'r') as file:
        data = json.load(file)

    saveUsers()
    saveAdmins()    
    savedone()
    saveQuestions()
    saveResponse()
    create_zip()

    return send_file('backup.zip', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True,port=3000,host='0.0.0.0')
