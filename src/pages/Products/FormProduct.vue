<template>
  <b-modal
    v-model="modalProduct"
    :title="product.id ? 'Editar Produto' : 'Cadastrar Produto'"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
  >
    <form ref="form">
      <b-form-group
        label="Nome"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          v-model="form.name"
          :state="nameState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Categoria"
        label-for="category-id-select"
        invalid-feedback="Category is required"
        :state="categoryIdState"
      >
        <b-form-select
          id="category-id-select"
          v-model="form.category_id"
          :options="categories"
          value-field="id"
          text-field="name"
          :state="categoryIdState"
          required
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              Selecione uma categoria
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
    </form>
    <template #modal-footer>
      <b-button variant="danger" @click="resetModal">Cancelar</b-button>
      <b-button variant="primary" @click="handleSubmit">Enviar</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FormProduct',
  data() {
    return {
      form: {
        name: '',
        category_id: ''
      },
      nameState: null,
      categoryIdState: null,
    }
  },
  computed: {
    ...mapState('products', ['modalProduct', 'product']),
    ...mapState('categories', ['categories']),
  },
  methods:{
    ...mapActions('products',  [
      'ActionOpenModalProduct',
      'ActionUpdateProduct',
      'ActionInsertProduct',
    ]),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      switch (true) {
        case !this.form.name:
          this.nameState = valid
          break;
        case !this.form.category_id:
          this.categoryIdState = valid
          break;
        default:
          return valid
      }
    },
    resetModal() {
      if (!this.product.id) {
        this.form = {}
      }
      this.nameState = null,
      this.categoryIdState = null
      this.ActionOpenModalProduct()
      // this.$store.commit("categories/SET_CATEGORIES", [])
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      } else {
        if (this.product.id) {
          try {
            let form = {
              id: this.product.id,
              data: {
                ...this.form
              }
            }
            await this.ActionUpdateProduct(form)
            this.$bvToast.toast('Cadastro atualizado.', {
              title: 'Sucesso',
              autoHideDelay: 5000,
              solid: true,
            })
          } catch (error) {
            this.$bvToast.toast('Não foi possivel atualizar cadastro.', {
              title: 'Erro',
              autoHideDelay: 5000,
              solid: true,
            })
          } finally {
           this.ActionOpenModalProduct() 
          }
        } else {
          try {
            this.ActionInsertProduct(this.form)
            this.$bvToast.toast('Cadastro realizado.', {
              title: 'Sucesso',
              autoHideDelay: 5000,
              solid: true,
            })
          } catch (error) {
            this.$bvToast.toast('Não foi possivel realizar cadastro.', {
              title: 'Erro',
              autoHideDelay: 5000,
              solid: true,
            })
          } finally {
            this.resetModal()
          }
        }
      }
    }
  },
  watch: {
    'product': function() {
      if (Object.keys(this.product).length > 0) {
        this.form.name = this.product.name
        this.form.category_id = this.product.category_id
      } else {
        this.form = {}
      }
    }
  }
}
</script>

<style>

</style>