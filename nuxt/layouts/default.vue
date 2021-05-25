<template>
  <v-app>
    <app-navigation />

    <app-header />

    <v-main>
      <div class="pa-5">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation'
import Header from '~/components/Header'

export default {
  components: {
    AppHeader: Header,
    AppNavigation: Navigation,
  },
  middleware: 'auth',
}
</script>

<style lang="scss">
.page-enter-active, .page-leave-active { transition: opacity .25s; }
.page-enter, .page-leave-active { opacity: 0; }
</style>
