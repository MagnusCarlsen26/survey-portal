import {onRequest} from "firebase-functions/v2/https";
import { beforecreated, onUserSignup, beforesignedin } from './files/auth.js'
import { isAccess } from './files/survey.js'
import { isAdminAccess, download } from "./files/admin.js";

export const helloWorld = onRequest({cors : true},(req, res) => {
    res.status(200).send({"status" : "success","data" : "some... data"})
});

export { beforecreated, onUserSignup, beforesignedin, isAccess, isAdminAccess, download }