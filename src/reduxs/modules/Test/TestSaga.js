import { fork, take } from 'redux-saga/effects';

/* watcher */
function* watcherTest() {
    yield take('test');
    console.log('test');
}

const TestSagas = [
    fork(watcherTest),
];

export default TestSagas;
