<template>
  <forms-route-form
    backUrl="/routes"
    actionName="routes"
    :loading="loading"
    :list="list"
    :incomingObject="route"
    :places="places"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({store}) {
    const routesDataLoaded = store.state.routes.dataLoaded
    const placesDataLoaded = store.state.places.dataLoaded

    if (!routesDataLoaded) {
      await store.dispatch('routes/getCollection')
    }
    if (!placesDataLoaded) {
      await store.dispatch('places/getCollection')
    }
  },
  computed: {
    ...mapState('routes', [
      'loading',
      'list',
    ]),
    route() {
      const route = this.list.find((route) => route._id === this.$route.params.id)
      return route || null
    },
    places() {
      const places = this.$store.state.places.list
      return places
    }
  },
}
</script>

<style>
</style>
