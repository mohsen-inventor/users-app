import { Product } from '../../types';

import {
    CartActionType,
    GetProductsStartAction,
    GetProductsSuccessAction,
    GetProductsFailAction,
    AddToCartAction,
    RemoveFromCartAction,
    UpdateQuantityAction,
    UpdateCartCountAction,
    UpdateCartTotalPriceAction,
    DisplayProductAction,
} from './cartType';

const getProductsStart = (page: number = 1): GetProductsStartAction => {
    return {
        type: CartActionType.GetProductsStart,
        payload: {
            page: page,
        },
    };
};

const getProductsSuccess = (
    products: Product[],
    totalProductsCount: number
): GetProductsSuccessAction => {
    return {
        type: CartActionType.GetProductsSuccess,
        payload: {
            products: products,
            totalProductsCount: totalProductsCount,
        },
    };
};

const getProductsFail = (error: string): GetProductsFailAction => {
    return {
        type: CartActionType.GetProductsFail,
        payload: {
            error: error,
        },
    };
};

const addToCart = (product: Product): AddToCartAction => {
    return {
        type: CartActionType.AddToCart,
        payload: {
            product: product,
        },
    };
};

const removeFromCart = (productID: string): RemoveFromCartAction => {
    return {
        type: CartActionType.RemoveFromCart,
        payload: {
            productID: productID,
        },
    };
};

const updateQuantity = (
    productID: number,
    quantity: number
): UpdateQuantityAction => {
    return {
        type: CartActionType.UpdateQuantity,
        payload: {
            productID: productID,
            quantity: quantity,
        },
    };
};

const UpdateCartCount = (count: number): UpdateCartCountAction => {
    return {
        type: CartActionType.UpdateCartCount,
        payload: {
            count: count,
        },
    };
};

const UpdateCartTotalPrice = (
    totalPrice: number
): UpdateCartTotalPriceAction => {
    return {
        type: CartActionType.UpdateCartTotalPrice,
        payload: {
            totalPrice: totalPrice,
        },
    };
};

const displayProduct = (productDetails: Product): DisplayProductAction => {
    return {
        type: CartActionType.DisplayProduct,
        payload: {
            product: productDetails,
        },
    };
};

export {
    getProductsStart,
    getProductsSuccess,
    getProductsFail,
    addToCart,
    removeFromCart,
    updateQuantity,
    UpdateCartCount,
    UpdateCartTotalPrice,
    displayProduct,
};
