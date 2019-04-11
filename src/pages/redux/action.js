import * as api from '../api/index'

export const getClockRecordList = userCode => async dispatch => {
    const clockRecordList = await api.getClockRecordList({ userCode })
    dispatch({
        type: 'getList',
        clockRecordList
    })
}

export const increment = () => ({
    type: 'INCREMENT',
})

export const decrement = () => ({
    type: 'DECREMENT',
})
