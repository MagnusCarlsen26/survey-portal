import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
import fs from 'fs'
import csvWriter from 'csv-write-stream'
import { DateTime } from 'luxon'
import { exec } from 'child_process'
import archiver from 'archiver';
import { Readable } from 'stream';

async function listAccess() {
    try {
        const accessUsersSnapshot = await db.collection('users').where("isAccess", "==", true).get();
        const accessUsers = accessUsersSnapshot.docs.map(doc => doc.data());
        
        return accessUsers;
    } catch (error) {
        logger.error(error);
        return error;
    }
}

async function grantAccess({ emails }) {
    try {
        emails.forEach( async(email) => {
            logger.info(email)
            await db.runTransaction( async(t) => {
                let userSnapshot = await db.collection('users').where("email", "==", email).get();

                let userUuid;
                if (!userSnapshot.empty) {
                    userSnapshot.forEach(doc => {
                        userUuid = doc.data().uuid;
                    });
                    logger.info(userUuid);
                } else {
                    logger.info("No user found with the given email.");
                }
                t.update(db.collection("users").doc(userUuid), {isAccess : true} )
            })
        } )
        return "Granted access"
    } catch (error) {
        logger.error(error)
        return error
    }
}

async function removeAccess({ emails }) {
    try {
        emails.forEach( async(email) => {
            logger.info(email)
            await db.runTransaction( async(t) => {
                let userSnapshot = await db.collection('users').where("email", "==", email).get();

                let userUuid;
                if (!userSnapshot.empty) {
                    userSnapshot.forEach(doc => {
                        userUuid = doc.data().uuid;
                    });
                    logger.info(userUuid);
                } else {
                    logger.info("No user found with the given email.");
                }
                t.update(db.collection("users").doc(userUuid), {isAccess : false} )
            })
        } )
        return "Removed access"
    } catch (error) {
        logger.error(error)
        return error
    }
}

async function setQuestion({ page, doctors }) {;
    logger.info(page)
    try {
        const doctorsRef = db.collection('questions').doc(page)
        await doctorsRef.set({
            doctors
        })
        logger.info("Successfully saved doctors list.");
        return 'Done'
    } catch (error) {
        logger.error("Error saving doctors list:", error);
        return error
    }
}

function generateCsv(headers, rows) {
    const writer = csvWriter({ headers });
    const stream = new Readable();
    stream._read = () => {};  // No-op for read stream
    writer.pipe(stream);

    rows.forEach(row => {
        writer.write(row);
    });

    writer.end();
    return stream;
}

export const download = onRequest({ cors : true },async(req,res) => {
    try {
        const command = 'npx -p node-firestore-import-export firestore-export -a db/dbSecret.json -b db/backup.json';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Error: ${error.message}`);
                return res.status(500).send('Failed to export Firestore data');
            }
            if (stderr) {
                logger.error(`Stderr: ${stderr}`);
                return res.status(500).send(stderr);
            }
            logger.info(`Output: ${stdout}`);

            // Read the exported Firestore data from the backup file
            fs.readFile('db/backup.json', 'utf8', (err, data) => {
                if (err) {
                    logger.error('Error reading the file:', err);
                    return res.status(500).send('Error reading backup data');
                }

                const jsonData = JSON.parse(data);

                // Prepare the zip archive
                const archive = archiver('zip');
                res.setHeader('Content-Disposition', 'attachment; filename=backup.zip');
                res.setHeader('Content-Type', 'application/zip');
                archive.pipe(res);

                // Generate and append CSV files to the zip

                // Users CSV
                const usersHeaders = ['uuid', 'email', 'name', 'isAccess', 'surveyStatus', 'cat'];
                const users = jsonData.__collections__.users || {};
                const usersRows = Object.keys(users).map(uuid => [
                    users[uuid].uuid,
                    users[uuid].email,
                    users[uuid].name,
                    users[uuid].isAccess,
                    users[uuid].surveyStatus,
                    users[uuid].cat
                ]);
                const usersStream = generateCsv(usersHeaders, usersRows);
                archive.append(usersStream, { name: 'users.csv' });

                // Admins CSV
                const adminsHeaders = ['email'];
                const admins = jsonData.__collections__.admins || {};
                const adminsRows = Object.keys(admins).map(uuid => [
                    admins[uuid].email
                ]);
                const adminsStream = generateCsv(adminsHeaders, adminsRows);
                archive.append(adminsStream, { name: 'admins.csv' });

                // Done CSV
                const doneHeaders = ['uuid', 'q1', 'q2', 'q3', 'q4', 'q5', 'cat'];
                const done = jsonData.__collections__.done || {};
                const doneRows = Object.keys(done).map(docuId => [
                    done[docuId].uuid,
                    done[docuId].form.q1,
                    done[docuId].form.q2,
                    done[docuId].form.q3,
                    done[docuId].form.q4,
                    done[docuId].form.q5,
                    done[docuId].cat
                ]);
                const doneStream = generateCsv(doneHeaders, doneRows);
                archive.append(doneStream, { name: 'done.csv' });

                // Questions CSV
                const questionsHeaders = ['page', 'doctorId1', 'doctorId2', 'doctorId3', 'doctorId4', 'doctorId5', 'doctorId6'];
                const questions = jsonData.__collections__.questions || {};
                const questionsRows = Object.keys(questions).map(page => [
                    page,
                    questions[page].doctors[0].id,
                    questions[page].doctors[1].id,
                    questions[page].doctors[2].id,
                    questions[page].doctors[3].id,
                    questions[page].doctors[4].id,
                    questions[page].doctors[5].id
                ]);
                const questionsStream = generateCsv(questionsHeaders, questionsRows);
                archive.append(questionsStream, { name: 'questions.csv' });

                // Response CSV
                const responseHeaders = ['uuid', 'responseId', 'qid', 'cat'];
                const response = jsonData.__collections__.response || {};
                const responseRows = Object.keys(response).map(id => [
                    response[id].uuid,
                    response[id].responseId,
                    response[id].qid,
                    response[id].cat
                ]);
                const responseStream = generateCsv(responseHeaders, responseRows);
                archive.append(responseStream, { name: 'response.csv' });

                console.log("Hi")
                archive.finalize().then(() => {
                    logger.info('Zip file created and sent successfully');
                }).catch(err => {
                    logger.error('Error finalizing archive:', err);
                    res.status(500).send('Error creating zip file');
                });
            });
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal server error');
    }
})

export const isAdminAccess = onRequest({ cors : true },async(req,res) => {
    const uuid = req.body.data.uuid
    const option = req.body.data.option
    const payload = req.body.data.payload
    try {   
        const userSnapshot = await db.collection('users').doc(uuid).get();
        if (userSnapshot.exists) {
            const admin = await db.collection('admins').where("email","=",userSnapshot.data().email).get()
            logger.info(userSnapshot.data().email)
            logger.info(admin.empty)
            if (admin.empty) {
                res.status(401).send({
                    status : 'UNAUTHENTICATED',
                    data : "you don't have admin access"
                })
                return
            }
        } else {
            res.status(401).send({
                status : 'UNAUTHENTICATED',
                data : "you don't have admin access"
            })
            return
        }
        let result;
        logger.info(option)
        if ( option === 'response' ) result = response(payload)
        else if ( option === 'setQuestion' ) result = await setQuestion(payload)
        else if ( option === 'listAccess' ) result = await listAccess(payload)
        else if ( option === 'grantAccess' ) result = await grantAccess(payload)
        else if ( option === 'removeAccess' ) result = await removeAccess(payload)
        else if ( option === 'download' ) result = await download(payload)

        logger.info(result)
        if (result) {
            res.status(200).send({
                status : "success",
                data : result,
            })
        } else {
            res.status(400).send({ 
                status : "failed",
                data : "No valid option selected"
            })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({error,req : req.body.data,data : "data", status : "failed"})
    }
});