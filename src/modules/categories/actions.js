import api from "@/http/api"

export const ActionGetCategories = async ({ commit }) => {
  await api.get('/categories').then((res) => {
    commit("SET_CATEGORIES", res.data.data)
  }).catch(er => er)
}

export const ActionGetCategory = async ({ commit }, payload) => {
  await api.get(`/categories/${payload}`).then(res => {
    commit("SET_CATEGORY", res.data.data)
  }).catch(er => er)
}

export const ActionInsertCategory = async ({ dispatch }, payload) => {
  await api.post('/categories', payload).then(() => {
    dispatch('ActionGetCategories')
  }).catch(er => er)
}

export const ActionUpdateCategory = async ({ dispatch }, payload) => {
  const { id, data } = payload
  await api.put(`/categories/${id}`, data).then(() => {
    dispatch('ActionGetCategories')
  }).catch(er => er)
}

export const ActionDeleteCategory = async ({ dispatch }, payload) => {
  await api.delete(`/categories/${payload}`).then(() => {
    dispatch('ActionGetCategories')
  }).catch(er => er)
}

export const ActionOpenModalCategory = async ( { commit }) => {
  commit("SET_MODALCATEGORY")
}
