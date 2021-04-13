import { UserActionTypes } from './user.actiontypes';

export const signInStart = ({login, password}) => {
	return {
		type: UserActionTypes.SIGN_IN_START,
		payload: {login, password}
	}
}

export const signInSuccess = ({login, password}) => {
	return {
		type: UserActionTypes.SIGN_IN_SUCCESS,
		payload: {login, password}
	}
}

export const signInFailure = (error) => {
	return {
		type: UserActionTypes.SIGN_IN_FAILURE,
		payload: error
	}
}

export const signOutStart = () => {
	return {
		type: UserActionTypes.SIGN_OUT_START
	}
}

export const signOutSuccess = () => {
	return {
		type: UserActionTypes.SIGN_OUT_SUCCESS
	}
}

export const signOutFailure = (error) => {
	return {
		type: UserActionTypes.SIGN_OUT_FAILURE,
		payload: error
	}
}