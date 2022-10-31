import VueRouter from 'vue-router'
import { default as categories } from '@/pages/Categories/routes'
import { default as products } from '@/pages/Products/routes'
import { default as pageNotFound } from '@/pages/PageNotFound/routes'

const routes = [
  ...categories,
  ...products,
  ...pageNotFound,
]

const router = new VueRouter({
  routes,
})

export default router
