import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../Reducer';
import { rootSaga } from '../Action';
import reduxReset from 'redux-reset';
const sagaMiddleware = createSagaMiddleware();
function configureStore(initialState: {}) {
    const enhancer = compose(
        applyMiddleware(
            sagaMiddleware,
        ),
        reduxReset(),
    );
    return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});
sagaMiddleware.run(rootSaga);
export default store;