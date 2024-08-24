import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
import { stat } from "fs";

function listAccess() {
    try {
        return "listAccess"
    } catch(error) {
        return false
    }
}

function response() {
    try {
        return "response"
    } catch (error) {
        return false
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
        return false
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
        else if ( option === 'listAccess' ) result = listAccess(payload)
        else if ( option === 'setQuestion' ) result = await setQuestion(payload)
        
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
