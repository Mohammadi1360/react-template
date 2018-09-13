import {takeEvery, fork, call, put} from 'redux-saga/effects';
import request from 'superagent';

function getWeather(location) {
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"${location}")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    // call api
    return request
        .get(url)
        .then(data => JSON.parse(data.text)).catch((err) => {
            console.log(err.message);
        });
}

// one api call
function* callGetWeather({location, resolve, reject}) {
    const result = yield call(getWeather, location);
    // console.log('Here 1');
    // console.log(result);
    if (result.query.results) {
        yield put({type: 'FETCH_WEATHER_DONE', result});
        yield call(resolve);
    } else {
        yield call(reject, {location: 'No Data For That Location'});
    }
}

// Listening for an action
function* getWeatherSaga() {
    yield takeEvery('FETCH_WEATHER', callGetWeather);
}

function getCustomerList() {
    const url = `http://localhost:3000/employees`;

    // call api
    return request
        .get(url)
        .then(data => JSON.parse(data.text)).catch((err) => {
            console.log(err.message);
        });
}

// one api call
function* callGetCustomerList({resolve, reject}) {
    const result = yield call(getCustomerList);
    if (result.query.results) {
        yield put({type: 'FETCH_CUSTOMER_LIST_DONE', result});
        yield call(resolve);
    } else {
        yield call(reject, {location: 'No Data FOUND'});
    }
}

//Listening for an action
function* getCustomerListSaga() {
    yield takeEvery('FETCH_CUSTOMER_LIST', callGetCustomerList);
}


export default function* root() {
    yield [
        fork(getWeatherSaga),
        fork(getCustomerListSaga),
    ];
}
