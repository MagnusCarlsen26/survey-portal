import {onRequest} from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";

function response({ uuid, qid, respo }) {
    try {
        return "response"
    } catch (error) {
        return false
    }
}

function getQuestion({ uuid, page }) {
    try {
        return "getQuestion"
    }  catch (error) {
        return false
    }
}

function done({ uuid }) {
    try {
        return "done"
    } catch(error) {
        return false
    }
}

export const isAccess = onRequest({ cors : true },async(req,res) => {
    const uuid = req.body.data.uuid
    const option = req.body.data.option
    const payload = req.body.data.payload
    try {
        const docRef = db.collection('users').doc(uuid);
        const docSnap = await docRef.get();
        // if (!docSnap) {
        //     res.status(404).send({
        //         status : "failed",
        //         data : "User not found"
        //     })
        //     return
        // }
        
        let result;
        if ( option === 'response' ) result = response(payload)
        else if ( option === 'getQuestion' ) result = getQuestion(payload)
        else if ( option === 'done' ) result = done(payload)
        
        if (result) {
            res.status(200).send({
                status : "success",
                data : result,

            })
        } else {
            res.status(400).send({ status : "failed" })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({error,req : req.body.data,data : "data",error})
    }
});