<template>
  <div class="my-container">
    <form-category />
    <h2 class="py-5 mb-0 text-center">Categorias</h2>
    <div class="d-flex justify-content-end">
      <b-button variant="outline-info" @click="openModal">Adicionar</b-button>
    </div>
    <div class="my-4">
      <b-table
        class="my-4"
        :items="categories"
        :fields="fields"
        responsive=""
        :busy="loading"
        show-empty
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
              @click="removeCategory(data.item.id)"
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
import FormCategory from './FormCategory.vue'

export default {
  name: 'Categories',
  components: {
    FormCategory,
  },
  data() {
    return {
      fields,
      loading: false
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions('categories', [
        'ActionGetCategories',
        'ActionOpenModalCategory',
        'ActionGetCategory',
        'ActionDeleteCategory',
        'ActionSetCategories',
        'ActionSetCategory',
      ]),
    async fetchCategories() {
      this.loading = true
      try {
        await this.ActionGetCategories()
      } finally {
        this.loading = false
      }
    },
    openModal() {
      this.ActionOpenModalCategory()
      this.ActionSetCategory({})
    },
    async openModalEdit(id) {
      await this.ActionGetCategory(id)
      this.ActionOpenModalCategory()
    },
    async removeCategory(id) {
      try {
        let dados = await this.ActionDeleteCategory(id)
        if (dados.data.error) {
          throw dados
        } else {
          let filter = this.categories.filter(item => item.id !== id)
          this.ActionSetCategories(filter)
          this.$bvToast.toast('Cadastro removido.', {
            title: 'Sucesso',
            autoHideDelay: 5000,
            solid: true,
          })
        }
      } catch (error) {
        this.$bvToast.toast('Não foi possivel remover cadastro.', {
          title: 'Erro',
          autoHideDelay: 5000,
          solid: true,
        })
      }
    }
  },
}
</script>

<style scoped>
  .my-container{
    height: calc(100vh - 56px);
  }
</style>