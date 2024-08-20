import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {
    beforeUserCreated,
    beforeUserSignedIn,
} from "firebase-functions/v2/identity";
  
export const beforecreated = beforeUserCreated((event) => {
    const user = event.data;

    if (!user?.email?.includes('@iitj.ac.in')) {
      throw new HttpsError('invalid-argument', "Unauthorized email");
    }
});

// export const beforesignedin = beforeUserSignedIn((event) => {
//     // TODO
// });

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
