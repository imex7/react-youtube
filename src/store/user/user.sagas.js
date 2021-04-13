import { takeLatest, put, all, call, delay } from 'redux-saga/effects';
import { UserActionTypes } from './user.actiontypes';
import { signInSuccess, signInFailure,
 signOutStart, signOutSuccess, signOutFailure
} from './user.actions';
import { getUserByNameAndPassword } from '../../fake-users'
import jwt from 'jsonwebtoken'

const set_token = (login, password) => {
	console.log('SET_TOKEN')
	let token = jwt.sign({ login, password }, "MyLolSecretKey", {expiresIn: 1*60})
	localStorage.setItem('token', token)
	console.log(token)
}

function* signIn_worker({payload: {login, password}}) {
	console.log('SIGN_IN_WORKER IS RUN!!!!')
	const token = localStorage.getItem('token')
	if (token !== null) {
		console.log('TOKEN EXIST!!!');
		localStorage.removeItem('token')
	}
	try {
		yield call(getUserByNameAndPassword, {login, password})
		yield put(signInSuccess({login, password}))
		yield set_token(login, password)
	} catch(err) {
		yield put(signInFailure(err))
	}
}

function* signOut_worker() {
	console.log('SIGN_OUT_WORKER IS RUN!!!!')
	const token = localStorage.getItem('token')
	if (token !== null) {
		console.log('TOKEN EXIST!!!');
		localStorage.removeItem('token')
	}
	try {
		yield delay(1000)
		yield put(signOutSuccess())
	} catch(err) {
		yield put(signOutFailure(err))
	}
}

function* signIn_watcher() {
	yield takeLatest(UserActionTypes.SIGN_IN_START, signIn_worker)
}

function* signOut_watcher() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut_worker)
}

export default function* userSagas() {
	yield all([
		call(signIn_watcher),
		call(signOut_watcher)
	])
}