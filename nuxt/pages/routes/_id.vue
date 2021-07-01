<template>
  <forms-route-form
    backUrl="/routes"
    actionName="routes"
    :loading="loading"
    :incomingObject="route"
    :markers="markers"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({store}) {
    const routesDataLoaded = store.state.routes.dataLoaded
    const markersDataLoaded = store.state.markers.dataLoaded

    if (!routesDataLoaded) {
      await store.dispatch('routes/getCollection')
    }
    if (!markersDataLoaded) {
      await store.dispatch('markers/getCollection')
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
    markers() {
      const markers = this.$store.state.markers.list
      return markers
    }
  },
}
</script>

<style>
</style>
