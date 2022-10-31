export default {
  SET_PRODUCTS(state, payload) {
    state.products = payload
  },

  SET_PRODUCT(state, payload){
    state.product = payload
  },

  SET_MODALPRODUCT(state){
    state.modalProduct = !state.modalProduct
  }
}