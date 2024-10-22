import { onRequest } from "firebase-functions/v2/https";
import { db } from './../config.js'
import { logger } from "firebase-functions";
import {bucket} from "./../config.js"

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
    try {
        const doctorsRef = db.collection('questions').doc(page)
        await doctorsRef.set({
            doctors
        })
        // const uploadPromises = doctors.map( async (doctor) => {
        //     const imageUrl = await testBucket(doctor.pfp, doctor.id);
        //     return { ...doctor, imageUrl }; // Return the original data along with the image URL
        // });

        // const uploadedImages = await Promise.all(uploadPromises)

        // const doctorsWithoutPfp = uploadedImages.map( ({imageUrl,pfp,...doctor}) => ({
        //     ...doctor,
        //     pfp : imageUrl
        // }) )

        // await doctorsRef.set({
        //     doctors : doctorsWithoutPfp
        // })
        logger.info("Successfully saved doctors list.");
        return 'Done'
    } catch (error) {
        logger.error("Error saving doctors list:", error);
        return error
    }
}

async function testBucket(binaryImage, destination) {
    return new Promise((resolve, reject) => {
        try {
            const file = bucket.file(destination);
            const stream = file.createWriteStream({ metadata: { contentType: 'image/jpeg' } });

            stream.on('error', (error) => {
                logger.error('Error uploading file:', error);
                reject(error); // Reject the promise on error
            });

            stream.on('finish', () => {
                logger.info('File uploaded successfully!');
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`; // Construct the URL
                resolve(publicUrl); // Resolve the promise with the image URL
            });

            stream.end(binaryImage);
        } catch (error) {
            logger.error('Error uploading file:', error);
            reject(error); // Reject the promise on error
        }
    });
}

async function denyPhoto({ emails }) {
    try {
        emails.forEach( async(email) => {
            await db.runTransaction( async(t) => {
                let userSnapshot = await db.collection('users').where("email", "==", email).get();

                let userUuid;
                if (!userSnapshot.empty) {
                    userSnapshot.forEach(doc => {
                        userUuid = doc.data().uuid;
                    });
                } else {
                    logger.info("No user found with the given email.");
                }
                let userDoc = await t.get(db.collection("users").doc(userUuid));
                let currentIsDenyPhoto = userDoc.data().isDenyPhoto;
                t.update(db.collection("users").doc(userUuid), { isDenyPhoto : !currentIsDenyPhoto} )
            })
        } )
        return "denyPhoto"
    } catch (error) {
        logger.error(error)
        return error
    }
}

async function setInstructions({ type, instructions }) {
    try {
        if (type === "survey" || type === "postSurvey") {
            const doctorsRef = db.collection("instructions").doc(type)
            await doctorsRef.set({
                instructions
            })
            return 'Done'
        }
        return 'Please choose between survey and postSurvey.'
    } catch (error) {
        logger.error("Error saving doctors list:", error);
        return error
    }
}

async function setPostSurveyQuestion(question,page) {
    try {
        const doctorsRef = db.collection('postSurveyQuestions').doc(page)
        await doctorsRef.set({
            question
        })
        return 'Done'
    } catch (error) {
        logger.error("Error saving doctors list:", error);
        return error
    }
}

export const isAdminAccess = onRequest({ cors : true , minInstances: 0 },async(req,res) => {
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
        else if ( option === 'setInstructions' ) result = await setInstructions(payload)
        else if ( option === 'listAccess' ) result = await listAccess(payload)
        else if ( option === 'grantAccess' ) result = await grantAccess(payload)
        else if ( option === 'removeAccess' ) result = await removeAccess(payload)
        else if ( option === 'denyPhoto' ) result = await denyPhoto(payload)
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