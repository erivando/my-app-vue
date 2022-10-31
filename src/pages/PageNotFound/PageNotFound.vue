<template>
  <div class="my-container">
    <div class="pt-5">
      <b-card class="custom-bg border-0">
        <h1 class="text-center custom-h1">404</h1>
        <b-img center class="my-5" :src="require('@/assets/pg-not-found.svg')" height="200px" />
        <p class="text-center">Pagina não encontrada</p>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
  .my-container{
    height: calc(100vh - 56px);
  }
  .custom-h1{
    font-size: 4rem !important;
  }
  .custom-bg{
    background-color: #e9ecef !important;
  }
</style>