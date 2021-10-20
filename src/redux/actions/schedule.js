import * as type from '../types';

export function getSchedule(schedule) {
    return {
        type: type.GET_SCHEDULE_REQUESTED,
        payload: schedule,
    }
}
