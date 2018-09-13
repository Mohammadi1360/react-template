import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import weather from './weather' ;
import customer from './customer' ;


const rootReducer = combineReducers({
    weather,
    customer,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
