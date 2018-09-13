function customer(state = {}, action) {
    switch (action.type) {
        case 'FETCH_CUSTOMER_LIST_DONE' :
            return action.result;
        default:
            return state;
    }
}

export default customer;
