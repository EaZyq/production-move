import { PRODUCT } from "../types";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.GET_ALL_OWN_PRODUCT_BY_PL:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT.GET_ALL_OWN_PRODUCT_SOLD:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT.SELL_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (prod) => prod.prod_id !== action.payload.prod_id
        ),
      };
    case PRODUCT.REPORT_PRODUCT:
      console.log("action.payload", action.payload);
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod.soldStatus_product.id === action.payload.id) {
            prod.soldStatus_product = { ...action.payload };
          }
          return prod;
        }),
      };
    case PRODUCT.MOVE_PRODUCT:
      console.log("action.payload", action.payload);
      console.log("action.payload.product_id", action.payload.product_id);
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod.prod_id === action.payload.prod_id) {
            prod = { ...action.payload };
          }
          return prod;
        }),
      };
    case PRODUCT.FIX_PRODUCT:
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod.prod_id === action.payload.prod_id) {
            prod.soldStatus_product.error_id = null;
          }
          return prod;
        }),
      };
    default:
      return state;
  }
};

export default productReducer;
