import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/confing'

export async function userServerCall( option, payload, isAdmin ) {
    const uuid = localStorage.getItem('userUuid')

    const result =  await httpsCallable(functions, isAdmin ? 'isAdminAccess' : 'isAccess')({
        uuid,
        option,
        payload : {
            ...payload,
            uuid
        }
    });
    console.log(result)
    return result
}

export default userServerCall