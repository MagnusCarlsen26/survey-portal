import functions from 'firebase-functions'
import {
        beforeUserCreated,
        beforeUserSignedIn,
} from "firebase-functions/v2/identity";
import { db } from './../config.js'
 
export const beforecreated = beforeUserCreated({
    minInstances: 2,
},(event) => {
    const user = event.data;

    if (!user?.email?.includes('@iitj.ac.in')) {
        throw new functions.https.HttpsError('Please signup with IITJ email', "Unauthorized email");
    }
});

export const onUserSignup = functions.runWith({
    minInstances: 2,
}).auth.user().onCreate(async(user) => {
    const email = user.email;
    const uuid = user.uid;
    const name = user.displayName
 
    let docRef = db.collection('users').doc(user.uid);

    const giveAccess = [
        "sindhav.1@iitj.ac.in",
        "dweepobotee@iitj.ac.in",
        "b24cs1005@iitj.ac.in",
        "b24ci1036@iitj.ac.in",
        "b24cm1020@iitj.ac.in",
        "b23ci1038@iitj.ac.in",
        "b24cs1081@iitj.ac.in",
        "b24cs1031@iitj.ac.in",
        "b24ph1018@iitj.ac.in",
        "B23CM1058@iitj.ac.in",
        "b24ch1003@iitj.ac.in",
        "b23mt1030@iitj.ac.in",
        "b22me074@iitj.ac.in",
        "b24cs1056@iitj.ac.in",
        "b24me1011@iitj.ac.in",
        "b22ai007@iitj.ac.in",
        "b24cs1030@iitj.ac.in",
        "b24ch1048@iitj.ac.in",
        "B23CS1096@iitj.ac.in",
        "b23bb1039@iitj.ac.in",
        "B23ES1006@iitj.ac.in",
        "b22bb009@iitj.ac.in",
        "b22cs022@iitj.ac.in",
        "b24bb1021@iitj.ac.in",
        "b24ee1050@iitj.ac.in",
        "b22ch013@iitj.ac.in",
        "jat.2@iitj.ac.in",
        "singh.185@iitj.ac.in",
        "sinha.8@iitj.ac.in",
        "kumar.318@iitj.ac.in",
        "b22ch004@iitj.ac.in",
        "kunjumon.1@iitj.ac.in",
        "borage.1@iitj.ac.in",
        "b22me044@iitj.ac.in",
        "b24cs1013@iitj.ac.in",
        "jharwal.1@iitj.ac.in",
        "B23ES1008@iitj.ac.in",
        "arafat.1@iitj.ac.in",
        "barnwal.1@iitj.ac.in",
        "m24msa074@iitj.ac.in",
        "m23msa024@iitj.ac.in",
        "m23msa006@iitj.ac.in",
        "m24msa051@iitj.ac.in",
        "b24ci1045@iitj.ac.in",
        "m23msa017@iitj.ac.in",
        "m23msa079@iitj.ac.in",
        "m23msa002@iitj.ac.in",
        "lakhwani.1@iitj.ac.in",
        "m23msa025@iitj.ac.in",
        "m23msa056@iitj.ac.in",
        "m23msf004@iitj.ac.in",
        "m23msa038@iitj.ac.in",
        "m24msa003@iitj.ac.in",
        "m24msa016@iitj.ac.in",
        "m24msa032@iitj.ac.in",
        "m23msa080@iitj.ac.in",
        "m23msa077@iitj.ac.in",
        "m24eev013@iitj.ac.in",
        "m24eev004@iitj.ac.in",
        "d24cse005@iitj.ac.in",
        "m24eev002@iitj.ac.in",
        "m24eev020@iitj.ac.in",
        "b24edp008@iitj.ac.in",
        "r23ab0002@iitj.ac.in",
        "m24mac014@iitj.ac.in",
        "m24eev006@iitj.ac.in",
        "b24edc001@iitj.ac.in",
        "m24cps008@iitj.ac.in",
        "m24eet015@iitj.ac.in",
        "b23ph1002@iitj.ac.in",
        "m23ma2002@iitj.ac.in",
        "m23msa058@iitj.ac.in",
        "b24edp003@iitj.ac.in",
        "b24edc002@iitj.ac.in",
        "b22ch036@iitj.ac.in",
        "p23ai0004@iitj.ac.in",
        "m23msa100@iitj.ac.in",
        "bhardwaj.11@iitj.ac.in",
        "b22ci024@iitj.ac.in",
        "m23msa015@iitj.ac.in",
        "b24me1079@iitj.ac.in",
        "b22ee087@iitj.ac.in",
        "b22cs061@iitj.ac.in",
        "b24bb1017@iitj.ac.in",
        "b23ee1061@iitj.ac.in",
        "B23CS1093@iitj.ac.in",
        "b23cs1006@iitj.ac.in",
        "b24bb1029@iitj.ac.in",
        "d23csa001@iitj.ac.in",
        "d23cse004@iitj.ac.in",
        "m23csa016@iitj.ac.in",
        "B23EE1086@iitj.ac.in",
        "verma.46@iitj.ac.in",
        "m23msf001@iitj.ac.in",
        "barve.1@iitj.ac.in",
        "siddiqui.1@iitj.ac.in",
        "m23msa063@iitj.ac.in",
        "b22me003@iitj.ac.in",
        "b22ch038@iitj.ac.in",
        "m24cse032@iitj.ac.in",
        "B23CS1089@iitj.ac.in",
        "b22me045@iitj.ac.in",
        "b22me034@iitj.ac.in",
        "m23la1002@iitj.ac.in",
        "m23msa013@iitj.ac.in",
        "b22me077@iitj.ac.in",
        "b22me005@iitj.ac.in",
        "b23cs1057@iitj.ac.in",
        "agarwal.28@iitj.ac.in",
        "d24csa002@iitj.ac.in",
        "m24mac004@iitj.ac.in",
        "b24edm017@iitj.ac.in",
        "m24msa015@iitj.ac.in",
        "p22ms011@iitj.ac.in",
        "b23me1014@iitj.ac.in",
        "B23EE1097@iitj.ac.in",
        "b23es1019@iitj.ac.in",
        "b24cm1052@iitj.ac.in",
        "b24cm1050@iitj.ac.in",
        "b24ee1022@iitj.ac.in",
        "b24cs1037@iitj.ac.in",
        "b24ci1001@iitj.ac.in",
    ]``

    await docRef.set({
        email,
        uuid,
        name,
        cat: Date.now(),
        surveyStatus : false,
        isAccess : giveAccess.includes(email),
        isDenyPhoto : false
    });
    return 0
});

export const beforesignedin = beforeUserSignedIn({
    minInstances: 2,  // Keeps at least 1 instance warm
},(event) => {
    const user = event.data;
 
    if (!user?.email?.includes('@iitj.ac.in')) {
      throw new functions.https.HttpsError('Please signin with IITJ email', "Unauthorized email");
    }
});