export default {
  SET_CATEGORIES(state, payload){
    state.categories = payload
  },

  SET_CATEGORY(state, payload){
    state.category = payload
  },
  SET_MODALCATEGORY(state) {
    state.modalCategory = !state.modalCategory
  }
}