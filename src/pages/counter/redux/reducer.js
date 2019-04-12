
// 计算得数
const counterReducer = (state = 1, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 11
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
};

export default counterReducer
