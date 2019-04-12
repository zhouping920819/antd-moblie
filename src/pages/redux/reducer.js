import { fromJS } from 'immutable'
import React from 'react'
const defaultState = fromJS({
    clockRecordList: {
        content: [],
        totalElements: 0,
        size: 10,
        number: 1,
        totalPages: 1
    }
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'getList':
            return state.mergeIn(
                ['clockRecordList', 'content'],
                action.clockRecordList.get('content')
            )
        default:
            return state
    }
};




export default reducer

