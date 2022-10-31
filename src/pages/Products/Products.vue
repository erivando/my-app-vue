<template>
  <div class="my-container">
    <form-product />
    <h2 class="py-5 mb-0 text-center">Produtos</h2>
    <div class="d-flex justify-content-end">
      <b-button variant="outline-info" @click="openModal">Adicionar</b-button>
    </div>
    <div class="my-4">
      <b-table
        class="my-4"
        :items="products"
        :fields="fields"
        responsive=""
        :busy="loading"
      >
        <template #table-busy>
          <div class="text-center text-primary my-4">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(created_at)="data">
          {{
            new Intl.DateTimeFormat('pt-BR').format(new Date(data.item.created_at))
          }}
        </template>
        <template #cell(actions)="data">
          <div class="d-flex justify-content-end">
            <b-button
              size="sm"
              class="mx-1"
              variant="outline-primary"
              @click="openModalEdit(data.item.id)"
            >
              <b-icon icon="pencil" />
            </b-button>
            <b-button
              size="sm"
              class="mx-1"
              variant="outline-danger"
              @click="removeProduct(data.item.id)"
            >
              <b-icon icon="trash" />
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { fields } from './column-table'
import FormProduct from './FormProduct.vue'

export default {
  name: 'Products',
  components: {
    FormProduct,
  },
  data() {
    return {
      fields,
      loading: false,
    }
  },
  computed: {
    ...mapState('products', ['products']),
  },
  mounted() {
    this.fetchProducts()
    this.ActionGetCategories()
  },
  methods: {
    ...mapActions('products', [
      'ActionGetProducts',
      'ActionOpenModalProduct',
      'ActionGetProduct',
      'ActionDeleteProduct'
    ]),
    ...mapActions('categories', [
      'ActionGetCategories',
    ]),
    async fetchProducts() {
      this.loading = true
      try {
        await this.ActionGetProducts()
      } finally {
        this.loading = false
      }
    },
    
    openModal() {
      this.ActionOpenModalProduct()
      this.$store.commit('products/SET_PRODUCT', {})  
    },

    async openModalEdit(id) {
      await this.ActionGetProduct(id)
      this.ActionOpenModalProduct()
    },

    async removeProduct(id) {
      try {
        await this.ActionDeleteProduct(id)
        this.$bvToast.toast('Cadastro removido.', {
          title: 'Sucesso',
          autoHideDelay: 5000,
          solid: true,
        })
      } catch (error) {
        this.$bvToast.toast('Não foi possivel remover cadastro.', {
          title: 'Erro',
          autoHideDelay: 5000,
          solid: true,
        })
      }
    }
  }
}
</script>

<style>
  .my-container{
    height: calc(100vh - 56px);
  }
</style>