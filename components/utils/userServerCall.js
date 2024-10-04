import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/confing'

const uuid = localStorage.getItem('userUuid')

export async function userServerCall( option, payload, isAdmin ) {
    return await httpsCallable(functions, isAdmin ? 'isAdminAccess' : 'isAccess')({
        uuid,
        option,
        payload : {
            ...payload,
            uuid
        }
    });
}

export default userServerCall