import api from "@/http/api";

export const ActionGetProducts = async ({ commit }) => {
  await api.get('/products').then((res) => {
    commit("SET_PRODUCTS", res.data.data)
  }).catch(er => er)
}

export const ActionGetProduct = async ({ commit }, payload) => {
  await api.get(`/products/${payload}`).then(res => {
    commit("SET_PRODUCT", res.data.data)
  }).catch(er => er)
}

export const ActionInsertProduct = async ({ dispatch }, payload) => {
  await api.post('/products', payload).then(() => {
    dispatch('ActionGetProducts')
  }).catch(er => er)
}

export const ActionUpdateProduct = async ({ dispatch }, payload) => {
  const { id, data } = payload
  await api.put(`/products/${id}`, data).then(() => {
    dispatch('ActionGetProducts')
  }).catch(er => er)
}

export const ActionDeleteProduct = async ({ dispatch }, payload) => {
  await api.delete(`/products/${payload}`).then(() => {
    dispatch('ActionGetProducts')
  }).catch(er => er)
}

export const ActionOpenModalProduct = async ( { commit }) => {
  commit("SET_MODALPRODUCT")
}