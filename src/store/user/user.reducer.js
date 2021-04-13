import { UserActionTypes } from './user.actiontypes';

const initial_state = {
	login: null,
	password: null,
	isFetching: false,
	error: null
}

export default function userReducer(state = initial_state, action) {
	switch (action.type) {
		case UserActionTypes.SIGN_IN_START:
			return {
				...state,
				isFetching: true,
			}
		case UserActionTypes.SIGN_OUT_START:
			return {
				...state,
				isFetching: true,
			}
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				login: action.payload.login,
				password: action.payload.password,
				isFetching: false,
				error: null
			}
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				login: null,
				password: null,
				isFetching: false,
				error: null
			}
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}

		default:
			return state
	}
};
