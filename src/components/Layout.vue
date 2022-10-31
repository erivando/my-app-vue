<template>
  <div>
    <the-header></the-header>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue'

export default {
  name: "Layout",
  components: { TheHeader },
}
</script>

<style>

</style>