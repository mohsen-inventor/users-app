import { Product } from '../../types';

// Cart state
export interface CartState {
    cart: CartItem[];
    cartItemsCount: number;
    products: Product[];
    totalProductsCount: number;
    productDetails: Product;
}

// Cart item (product)
export interface CartItem extends Product {
    quantity: number;
}

// Actions types
export enum CartActionType {
    GetProductsStart = 'getProducts',
    GetProductsSuccess = 'getProductsSuccess',
    GetProductsFail = 'getProductsFail',
    AddToCart = 'addToCart',
    RemoveFromCart = 'removeFromCart',
    UpdateQuantity = 'updateQuantity',
    UpdateCartCount = 'updateCartCount',
    UpdateCartTotalPrice = 'updateCartTotalPrice',
    DisplayProduct = 'displayProduct',
}

// Actions interfaces
export interface GetProductsStartAction {
    type: CartActionType.GetProductsStart;
    payload: {
        page: number;
    };
}

export interface GetProductsSuccessAction {
    type: CartActionType.GetProductsSuccess;
    payload: {
        products: Product[];
        totalProductsCount: number;
    };
}

export interface GetProductsFailAction {
    type: CartActionType.GetProductsFail;
    payload: {
        error: string;
    };
}

export interface AddToCartAction {
    type: CartActionType.AddToCart;
    payload: {
        product: Product;
    };
}

export interface RemoveFromCartAction {
    type: CartActionType.RemoveFromCart;
    payload: {
        productID: string;
    };
}

export interface UpdateQuantityAction {
    type: CartActionType.UpdateQuantity;
    payload: {
        productID: number;
        quantity: number;
    };
}

export interface UpdateCartCountAction {
    type: CartActionType.UpdateCartCount;
    payload: {
        count: number;
    };
}

export interface UpdateCartTotalPriceAction {
    type: CartActionType.UpdateCartTotalPrice;
    payload: {
        totalPrice: number;
    };
}

export interface DisplayProductAction {
    type: CartActionType.DisplayProduct;
    payload: {
        product: Product;
    };
}

export type CartAction =
    | GetProductsStartAction
    | GetProductsSuccessAction
    | GetProductsFailAction
    | AddToCartAction
    | RemoveFromCartAction
    | UpdateQuantityAction
    | UpdateCartCountAction
    | UpdateCartTotalPriceAction
    | DisplayProductAction;
