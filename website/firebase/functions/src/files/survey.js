import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
    
async function response({ uuid, qid, responseId, timeToAttempt }) {
    try {
        if (!await checkPrevResponse({ uuid, page : qid, lookupTable : 'response' })) return "Please submit response for previous quesitons first."     
        if (!await checkIfExistResponse({ uuid, page : qid, lookupTable : 'response' })) return "You have already attempted the question."  
        
        await db.collection('response').add({
            uuid,
            qid,
            responseId,
            cat : Date.now(),
            timeToAttempt,
            ts : new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
        return "response"
    } catch (error) {
        logger.error(error)
        return error
    }
}

async function getQuestion({ uuid, page }) {
    try {
        if (!await checkPrevResponse({ uuid,page,lookupTable : 'response' })) return "Please attempt previous questions first."
        let question =  await db.collection('questions').doc(page).get()
        const userSnapShot = await db.collection('users').doc(uuid).get()

        question = question.data().doctors

        if (userSnapShot.data().isDenyPhoto) {
            question =  question.map( ({ pfp, ...rest }) => ({
                ...rest
            }))
        } 
        return  { doctors : question }
    }  catch (error) {
        logger.error(error)
        return error
    }
}

async function checkIfExistResponse({ uuid, page, lookupTable }) {
    try {
        logger.info(uuid,page,lookupTable)
        const query = await db.collection(lookupTable)
            .where('uuid','==',uuid)
            .where('qid','==',page)
            .get()
        logger.info(query.empty)
        if (query.empty) return true 
        else return false
    } catch (error) {
        logger.error("error in checkIfExistResponse",error)
        return false
    }
}

async function checkPrevResponse({ uuid,page,lookupTable }) {
    try {
        page = page.toString()
        for( let qid = 1; qid<page; qid++ ) {
            const query = await db.collection(lookupTable)
                .where('uuid','==',uuid)
                .where('qid','==',qid.toString())
                .get()
            if (query.empty) {
                return false
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
        if (!await checkPrevResponse({ uuid, page : 16, lookupTable : 'response' })) return "Please answer all the survey questions."
        if (!await checkPrevResponse({ uuid, page , lookupTable : 'done' })) return "Please answer all the post survey questions."
        if (!await checkIfExistResponse({ uuid, page, lookupTable : 'done' })) return "You have already attempted the question."

        await db.collection('done').add({
            uuid,
            form,
            qid : page,
            cat : Date.now(),
            ts : new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
        return "done"
    } catch(error) {
        logger.error("error in done",error)
        return error
    }
}

async function getUserName({ uuid }) {
    try {
        const userSnapShot = await db.collection('users').doc(uuid).get();
        if (userSnapShot.exists) {
            return userSnapShot.data().name
        } 
        return "unauthenticated"
    } catch(error) {
        logger.error("Error in getUserName",error)
        return error
    }
}

async function getPostSurveyQuestions({ uuid, page }) {
    try {

        if (!await checkPrevResponse({ uuid, page : 16, lookupTable : 'response' })) return "Please answer all the survey questions."
        if (!await checkPrevResponse({ uuid, page , lookupTable : 'done' })) return "Please answer all the post survey questions."
        
        const question =  await db.collection('postSurveyQuestions').doc(page).get()
        return question.data()
    } catch( error ) {
        logger.error(error)
        return error
    }
}

async function surveyCompleted({ uuid }) {
    try {
        if (!await checkPrevResponse({ uuid, page : 16, lookupTable : 'response' })) return "Please answer all the survey questions."
        if (!await checkPrevResponse({ uuid, page : 4 , lookupTable : 'done' })) return "Please answer all the post survey questions."

        let docRef = db.collection('users').doc(uuid);
        docRef.update({
            surveyStatus : true,
            isAccess : false,
            completedAt : Date.now()
        })

        return "You have completed the survey !!"

    } catch ( error ) {
        logger.error(error)
        return error
    }
}

async function getInstructions({ uuid, level }) {
    if ( level === 'survey' ) {
        const instructions =  await db.collection('instructions').doc('survey').get()
        return instructions.data()
    } else if (level === 'postSurvey') {
        if (!await checkPrevResponse({ uuid, page : 16, lookupTable : 'response' })) return "Please answer all the survey questions."
        const instructions =  await db.collection('instructions').doc('postSurvey').get()
        return instructions.data()
    } else {
        return "invalid instructions"
    }
}

export const isAccess = onRequest({ cors : true, minInstances: 0 },async(req,res) => {
    const uuid = req.body.data.uuid
    const option = req.body.data.option
    const payload = req.body.data.payload
    try {
        const userSnapShot = await db.collection('users').doc(uuid).get();
        if (userSnapShot.exists) {
            // May be the responses are incorrect 
            if (!userSnapShot.data().isAccess) {
                res.status(200).send({
                    status : 'UNAUTHENTICATED',
                    data : "You don't have access to survey"
                })
                return
            } 
        } else {
            // May be the responses are incorrect 
            res.status(200).send({
                status : 'UNAUTHENTICATED',
                data : "No user found."
            })
            return
        }
        let result;
        if ( option === 'response' ) result = await response(payload)
        else if ( option === 'getQuestion' ) result = await getQuestion(payload)
        else if ( option === 'done' ) result = await done(payload)
        else if ( option === 'getUserName' ) result = await getUserName(payload)
        else if ( option === 'surveyCompleted' ) result = await surveyCompleted(payload)
        else if ( option === 'getPostSurveyQuestions' ) result = await getPostSurveyQuestions(payload)
        else if ( option === 'getInstructions' ) result = await getInstructions(payload)

        if (result) {
            res.status(200).send({
                status : "success",
                data : result,
            })
        } else {
            res.status(200).send({ 
                status : "failed",
                data : "No valid option selected"
            })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({error,req : req.body.data,data : "data",error})
    }
});