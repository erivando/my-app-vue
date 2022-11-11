import api from "@/http/api";

export const ActionGetProducts = async ({ dispatch }) => {
  await api.get('/products').then((res) => {
    dispatch("ActionSetProducts", res.data.data)
  }).catch(er => er)
}

export const ActionGetProduct = async ({ dispatch }, payload) => {
  await api.get(`/products/${payload}`).then(res => {
    dispatch("ActionSetProduct", res.data.data)
  }).catch(er => er)
}

export const ActionInsertProduct = async ({ dispatch }, payload) => {
  return await api.post('/products', payload)
}

export const ActionUpdateProduct = async ({ dispatch }, payload) => {
  const { id, data } = payload
  return await api.put(`/products/${id}`, data)
}

export const ActionDeleteProduct = async ({ dispatch }, payload) => {
  return await api.delete(`/products/${payload}`)
}

export const ActionSetProducts = async ({ commit }, payload) => {
  commit("SET_PRODUCTS", payload)
}

export const ActionSetProduct = async ({ commit }, payload) => {
  commit("SET_PRODUCT", payload)
}

export const ActionOpenModalProduct = async ( { commit }) => {
  commit("SET_MODALPRODUCT")
}