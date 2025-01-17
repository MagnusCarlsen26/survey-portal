import { httpsCallable } from 'firebase/functions';
import { functions } from '@/confing'

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
    return result
}

export default userServerCall