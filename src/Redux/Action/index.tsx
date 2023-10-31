import { fork } from 'redux-saga/effects';
import loginSagaAsync from './LoginAction/loginSaga';
export function* rootSaga() {
    yield fork(loginSagaAsync);
}