import api from "@/http/api"

export const ActionGetCategories = async ({ dispatch }) => {
  await api.get('/categories').then((res) => {
    dispatch("ActionSetCategories", res.data.data)
  }).catch(er => er)
}

export const ActionGetCategory = async ({ dispatch }, payload) => {
  await api.get(`/categories/${payload}`).then(res => {
    dispatch("ActionSetCategory", res.data.data)
  }).catch(er => er)
}

export const ActionInsertCategory = async ({ dispatch }, payload) => {
  return await api.post('/categories', payload)
}

export const ActionUpdateCategory = async ({ dispatch }, payload) => {
  const { id, data } = payload
  return await api.put(`/categories/${id}`, data)
}

export const ActionDeleteCategory = async ({ dispatch }, payload) => {
  return await api.delete(`/categories/${payload}`)
}

export const ActionSetCategories = async ({ commit }, payload) => {
  commit("SET_CATEGORIES", payload)
}

export const ActionSetCategory = ( { commit }, payload) => {
  commit("SET_CATEGORY", payload)
}

export const ActionOpenModalCategory = async ( { commit }) => {
  commit("SET_MODALCATEGORY")
}
