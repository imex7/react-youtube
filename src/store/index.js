import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import csm from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import userReducer from './user/user.reducer'
import queriesReducer from './queries/queries.reducer'
import userSagas from './user/user.sagas'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'queries'
	]
}

const rootReducer = combineReducers({
	user: userReducer,
	queries: queriesReducer
});

function* rootSaga() {
	yield all([
		call(userSagas)
	])
};

const sagaMiddleware = csm()
const store = createStore(
	persistReducer(persistConfig, rootReducer),
	applyMiddleware(logger, sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)

export {store, persistor}