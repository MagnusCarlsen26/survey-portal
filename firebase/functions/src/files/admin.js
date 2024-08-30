import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';

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

function response() {
    try {
        return "response"
    } catch (error) {
        return error
    }
}

async function setQuestion({ page, doctors }) {;
    logger.info(page)
    try {
        doctors = doctors.map( doctor => ({
            ...doctor,
            id : uuidv4()
        }) )
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

async function download({  }) {
    try {
        
    } catch(error) {    
        logger.error(error)
        return error
    }
}

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
