import json
import csv
import pytz
from datetime import datetime

def unix_to_ist(unix_timestamp):
   
    utc_time = datetime.utcfromtimestamp(unix_timestamp)
    ist = pytz.timezone('Asia/Kolkata')
    ist_time = utc_time.replace(tzinfo=pytz.utc).astimezone(ist)
    
    return ist_time.strftime('%Y-%m-%d %H:%M:%S')

def saveAdmins() :
    header = ['email']
    with open('db/admins.csv','w') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for uuid in data['__collections__']['admins'] :
            csv_writer.writerow([data['__collections__']['admins'][uuid]['email']])

def savedone():
    header = ['uuid','q1','q2','q3','q4','q5']
    with open('db/done.csv','w') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for docuId in data['__collections__']['done'] :
            csv_writer.writerow([
                data['__collections__']['done'][docuId]['uuid'],
                data['__collections__']['done'][docuId]['form']['q1'],
                data['__collections__']['done'][docuId]['form']['q2'],
                data['__collections__']['done'][docuId]['form']['q3'],
                data['__collections__']['done'][docuId]['form']['q4'],
                data['__collections__']['done'][docuId]['form']['q5'],
                data['__collections__']['done'][docuId]['cat'],
            ])

def saveQuestions() :
    header = ['page','doctorId1','doctorId2','doctorId3','doctorId4','doctorId5','doctorId6']
    with open('db/questions.csv','w') as file :
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
    header = ['uuid','responseId','qid','cat']
    with open('db/response.csv','w') as file :
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        for id in data['__collections__']['response'] :
            csv_writer.writerow([
                data['__collections__']['response'][id]['uuid'],
                data['__collections__']['response'][id]['responseId'],
                data['__collections__']['response'][id]['qid'],
                data['__collections__']['response'][id]['cat'],
            ])

def saveUsers() :
    header = ['uuid','email','name','isAccess','surveyStatus','cat']
    with open('db/users.csv','w') as file :
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
            ])

with open('backup.json', 'r') as file:
    data = json.load(file)

saveUsers()
saveAdmins()
# savedone()
saveQuestions()
saveResponse()