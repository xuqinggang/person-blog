import { all } from 'redux-saga/effects';
import TestSagas from 'reduxs/modules/Test/TestSaga';

export default function* rootSaga() {
    try {
        yield [
            ...TestSagas,
        ];
    } catch (err) {
        console.log('rootSaga', err);
    }
}
