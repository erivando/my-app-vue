export default [
  {
    path: '*',
    name: 'pageNotFound',
    component: () => import('@/pages/PageNotFound/PageNotFound.vue')
  },
]