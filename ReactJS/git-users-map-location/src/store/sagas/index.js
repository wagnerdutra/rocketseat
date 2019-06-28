import { all, takeLatest } from 'redux-saga/effects';

import addUser from './users';

import { Types as UsersTypes } from '../ducks/users';

export default function* rootSaga() {
  yield all([takeLatest(UsersTypes.ADD_REQUEST, addUser)]);
}
