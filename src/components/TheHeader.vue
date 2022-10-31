<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-brand href="#">My System</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Categorias</b-nav-item>
          <b-nav-item to="/products">Produtos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheHeader',
}
</script>

<style>

</style>