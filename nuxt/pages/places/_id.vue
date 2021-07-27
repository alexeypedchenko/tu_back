<template>
  <forms-marker-place-form
    backUrl="/places"
    :loading="loading"
    :incomingMarker="marker"
    :incomingPlace="place"
    :tags="getTags"
  />
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  async fetch ({store}) {
    const dataLoadedPlaces = store.state.places.dataLoaded
    const dataLoadedMarkers = store.state.markers.dataLoaded

    if (!dataLoadedPlaces) {
      await store.dispatch('places/getCollection')
    }
    if (!dataLoadedMarkers) {
      await store.dispatch('markers/getCollection')
    }
  },
  computed: {
    ...mapGetters('markers', [
      'getTags'
    ]),
    loading() {
      return this.$store.state.places.loading || this.$store.state.markers.loading
    },
    markers() {
      return this.$store.state.markers.list
    },
    places() {
      return this.$store.state.places.list
    },
    marker() {
      const marker = this.markers.find((marker) => marker._id === this.$route.params.id)
      return marker || null
    },
    place() {
      if (!this.marker) return null
      const place = this.places.find((place) => place._id === this.marker.placeId)
      return place || null
    },
  },
}
</script>

<style>
</style>
