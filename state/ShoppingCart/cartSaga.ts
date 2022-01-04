import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Product } from '../../types';
import { CartActionType, CartAction, GetProductsStartAction } from './cartType';
import { getProductsSuccess, getProductsFail } from './cartAction';

// Saga worker
function* fetchProducts(action): CartAction {
    try {
        const response = yield call(
            fetch,
            `/api/products?page=${action.payload.page}`
        );
        const data = yield response.json();
        const products: Product[] = yield data.results;
        const totalProductsCount: number = yield data.count;
        yield put(getProductsSuccess(products, totalProductsCount));
    } catch (erorr) {
        yield put(getProductsFail(erorr.message));
    }
}

// Saga watcher (rootSaga)
function* rootSaga() {
    yield all([takeLatest(CartActionType.GetProductsStart, fetchProducts)]);
}

// export rootSaga
export default rootSaga;
