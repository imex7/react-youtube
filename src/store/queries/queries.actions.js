import { QueriesActionTypes } from './queries.actiontypes';

export const addItem = (item) => ({
	type: QueriesActionTypes.ADD_ITEM,
	payload: item
})

export const removeItem = (item) => ({
	type: QueriesActionTypes.REMOVE_ITEM,
	payload: item
})