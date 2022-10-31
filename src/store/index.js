import Vue from "vue";
import Vuex from "vuex";
import { default as categories } from '../modules/categories/index'
import { default as products } from '../modules/products'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    categories,
    products,
  }
})

export default store
