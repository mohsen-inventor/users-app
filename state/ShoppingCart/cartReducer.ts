import { CartActionType, CartAction, CartState } from './cartType';

const initialState: CartState = {
    cart: [],
    cartItemsCount: 0,
    products: [], // all products
    totalProductsCount: 0,
    productDetails: null, // single product for details page
};

const cartReducer = (state: CartState = initialState, action: CartAction) => {
    switch (action.type) {
        case CartActionType.GetProductsStart:
            return state;
        case CartActionType.GetProductsSuccess:
            return {
                ...state,
                totalProductsCount: action.payload.totalProductsCount,
                products: action.payload.products,
            };
        case CartActionType.GetProductsFail:
            return { ...state };
        case CartActionType.AddToCart:
            // Add new items to the cart OR update the quantity of existing ones
            const itemInCart = state.cart.find((item) => {
                return item.gtin === action.payload.product.gtin;
            });

            const updatedCart = itemInCart
                ? // Update the quantity of existing item
                  state.cart.map((item) => {
                      if (item.gtin === action.payload.product.gtin) {
                          return { ...item, quantity: item.quantity + 1 };
                      } else {
                          return item;
                      }
                  })
                : // Add new item to the cart
                  [...state.cart, { ...action.payload.product, quantity: 1 }];

            return {
                ...state,
                cart: updatedCart,
                cartItemsCount: state.cart.reduce((totalItems, cartItem) => {
                    return totalItems + cartItem.quantity;
                }, 1),
            };
        case CartActionType.RemoveFromCart:
            const itemToRemove = state.cart.find(
                (item) => item.gtin === action.payload.productID
            );

            return {
                ...state,
                cart: state.cart.filter(
                    (cartItem) => cartItem.gtin !== action.payload.productID
                ),
                cartItemsCount: state.cartItemsCount - itemToRemove?.quantity,
            };
        case CartActionType.UpdateQuantity:
            // update cart item quantity
            return { ...state };
        case CartActionType.UpdateCartCount:
            // update cart total items count
            return { ...state };
        case CartActionType.DisplayProduct:
            // select a single product to display in product details page
            return { ...state };
        default:
            return state;
    }
};

export default cartReducer;
