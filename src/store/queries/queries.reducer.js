import { QueriesActionTypes } from './queries.actiontypes';
import { v4 as uuid } from 'uuid';

const initial_state = {
	savedQueries: []
}

export default function queriesReducer(state = initial_state, action) {
	const readableDate = new Date(Date.now()).toLocaleString('ru-RU', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
	switch (action.type) {
		case QueriesActionTypes.ADD_ITEM:
			return {
				...state,
				savedQueries: [{
					id: uuid(),
					user: action.payload.user,
					date: readableDate,	
					url: action.payload.url},
					...state.savedQueries]
			}
		case QueriesActionTypes.REMOVE_ITEM:
			return {
				...state,
				savedQueries: state.savedQueries.filter((el) => {
						return el.id !== action.payload
					})
			}
		default:
			return state
	}
}