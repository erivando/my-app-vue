<template>
  <b-modal
    v-model="modalCategory"
    :title="category.id ? 'Editar Categoria' : 'Cadastrar Categoria'"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
  >
    <form ref="form">
      <b-form-group
        label="Nome"
        label-for="name-input"
        invalid-feedback="Campo obrigatório."
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          :state="nameState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <template #modal-footer>
      <b-button variant="danger" @click="resetModal">Cancelar</b-button>
      <b-button variant="primary" @click.prevent="handleSubmit">Enviar</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  name: 'FormCategory',
  computed: {
    ...mapState('categories', ['modalCategory', 'category', 'categories']),
  },
  data() {
    return {
      name: '',
      nameState: null,
    }
  },
  methods: {
    ...mapActions('categories', [
        'ActionOpenModalCategory',
        'ActionInsertCategory',
        'ActionUpdateCategory'
      ]),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      if (!this.category.id) {
        this.name = ''
      }
      this.nameState = null
      this.ActionOpenModalCategory()
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      } else {
        if (this.category.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    async save() {
      try {
        let data = { name: this.name }
        let dados = await this.ActionInsertCategory(data)
        if (dados.data.error) {
          throw dados
        } else {
          this.categories.push(dados.data.data)
          this.$bvToast.toast('Cadastro realizado.', {
            title: 'Sucesso',
            autoHideDelay: 5000,
            solid: true
          })
        }
      } catch (error) {
        this.$bvToast.toast('Não foi possivel realizar cadastro.', {
          title: 'Erro',
          autoHideDelay: 5000,
          solid: true
        })
      } finally {
        this.resetModal()
      }
    },
    async edit() {
      try {
        let form = {
          id: this.category.id,
          data: {
            name: this.name
          }
        }
        let dados = await this.ActionUpdateCategory(form)

        if (dados.data.error) {
          throw dados
        } else {
          this.$bvToast.toast('Cadastro atualizado.', {
            title: 'Sucesso',
            autoHideDelay: 5000,
            solid: true
          })
        }
      } catch (error) {
        this.$bvToast.toast('Não foi possivel atualizar cadastro.', {
          title: 'Erro',
          autoHideDelay: 5000,
          solid: true
        })
      } finally {
        this.ActionOpenModalCategory()
      }
    }
  },
  watch: {
    'category': function() {
      if(Object.keys(this.category).length > 0) {
        this.name = this.category.name
      } else {
        this.name = ''
      }
    }
  }
}
</script>

<style>

</style>