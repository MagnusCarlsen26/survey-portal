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

async function setQuestion({ page }) {
    const doctors = [
        {
            name: 'Dr. Mukul Kumar',
            specialty: 'General Physician',
            experience: 9,
            consultationFees: '1000',
            distance: 4,
            rating: '95%',
            ratingsCount: 189,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2Fdownload_image_1717249519334.png?alt=media&amp;token=994bf234-6d7a-4506-b700-c11e0bf22278'
        },
        {
            name: 'Dr. M Gowri',
            specialty: 'General Physician',
            experience: 9,
            consultationFees: '900',
            distance: 4,
            rating: '100%',
            ratingsCount: 186,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2FScreenshot%202024-06-13%20005519.jpg?alt=media&amp;token=90dee180-5457-4668-b41c-e2e753cb8a1b'
        },
        {
            name: 'Dr. Chaitra Nayak',
            specialty: 'General Physician',
            experience: 10,
            consultationFees: '1500',
            distance: 3.5,
            rating: '100%',
            ratingsCount: 480,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2Ffemale%20old.jpg?alt=media&amp;token=4550d7f4-0f3e-4009-98a3-26629dc3af94'
        },
        {
            name: 'Dr. Animesh Gupta',
            specialty: 'General Physician',
            experience: 15,
            consultationFees: '1200',
            distance: 0.2,
            rating: '95%',
            ratingsCount: 102,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2Fdownload_image_1717312280645.png?alt=media&amp;token=786673ea-2f7f-4608-be1b-65f46e83da7f'
        },
        {
            name: 'Dr. Rajendra Shankar',
            specialty: 'General Physician',
            experience: 18,
            consultationFees: '2000',
            distance: 3,
            rating: '97%',
            ratingsCount: 502,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2Fmale%20old.jpg?alt=media&amp;token=8f35f0f7-87de-4cc5-9037-4053e2b750c0'
        },
        {
            name: 'Dr. Rajani Sinha',
            specialty: 'General Physician',
            experience: 15,
            consultationFees: '1000',
            distance: 0.5,
            rating: '96%',
            ratingsCount: 105,
            image: 'https://firebasestorage.googleapis.com/v0/b/doctors-list-a7aba.appspot.com/o/images%2Findian_woman_middle_aged_docto%20(8).jpeg?alt=media&amp;token=127683c7-e706-463d-bba6-da350f9c9ea6'
        }
    ];
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
                res.status(400).send({
                    status : 'failed',
                    data : "you don't have admin access"
                })
                return
            }
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
            res.status(400).send({ status : "failed" })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({error,req : req.body.data,data : "data",error})
    }
});
