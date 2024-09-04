import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
    
async function response({ uuid, qid, responseId }) {
    try {
        if (!await checkPrevResponse({ uuid, page : qid, lookupTable : 'response' })) return "Please submit response for previous quesitons first."     
        await db.collection('response').add({
            uuid,
            qid,
            responseId,
            cat : Date.now()
        })
        return "response"
    } catch (error) {
        logger.error(error)
        return error
    }
}

async function getQuestion({ uuid, page }) {
    try {
        if (!await checkPrevResponse({ uuid,page })) return "Please attempt previous questions first."
        const question =  await db.collection('questions').doc(page).get()
        return question.data()
    }  catch (error) {
        logger.error(error)
        return error
    }
}

async function checkPrevResponse({ uuid,page,lookupTable }) {
    try {
        page = page.toString()
        logger.info("Loookup",lookupTable)
        for( let qid = 1; qid<page; qid++ ) {
            logger.info(`Checking for ${uuid},${qid}`)
            const query = await db.collection(lookupTable)
                .where('uuid','==',uuid)
                .where('qid','==',qid.toString())
                .get()
            logger.info(`Statue : ${query.empty}`)
            if (query.empty) {
                return false
            } else {

            }
        }
        return true
    } catch (error) {
        logger.error('Error in checkPrevResponse',error)
        return false
    }
}

async function done({ uuid, form, page }) {
    try {
        // if (!await checkPrevResponse({ uuid, page : 13, lookupTable : 'response' })) return "Please answer all the survey questions."
        if (!await checkPrevResponse({ uuid, page , lookupTable : 'done' })) return "Please answer all the post survey questions."

        await db.collection('done').add({
            uuid,
            form,
            page,
            cat : Date.now()
        })
        return "done"
    } catch(error) {
        logger.error("error in done",error)
        return error
    }
}

export const isAccess = onRequest({ cors : true },async(req,res) => {
    const uuid = req.body.data.uuid
    const option = req.body.data.option
    const payload = req.body.data.payload
    try {
        const userSnapShot = await db.collection('users').doc(uuid).get();
        if (userSnapShot.exists) {
            if (!userSnapShot.data().isAccess) {
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
        if ( option === 'response' ) result = await response(payload)
        else if ( option === 'getQuestion' ) result = await getQuestion(payload)
        else if ( option === 'done' ) result = await done(payload)
        
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
        res.status(500).send({error,req : req.body.data,data : "data",error})
    }
});