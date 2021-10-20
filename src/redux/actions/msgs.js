import * as type from '../types';

export function getMsgs(msgs) {
    return {
        type: type.GET_MSGS_REQUESTED,
        payload: msgs,
    }
}

export function addToDbMsg(formMsg) {
    return {
        type: type.ADD_MSG_REQUESTED,
        payload: formMsg,
    }
}

export function deleteMsgFromDb(msg) {
    return {
        type: type.DELETE_MSG_REQUESTED,
        payload: msg,
    }
}