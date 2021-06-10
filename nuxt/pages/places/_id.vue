<template>
  <forms-place-form
    backUrl="/places"
    actionName="places"
    :loading="loading"
    :list="list"
    :incomingObject="place"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getCollection')
    }
  },
  computed: {
    ...mapState('places', [
      'loading',
      'list',
    ]),
    place() {
      const place = this.list.find((place) => place._id === this.$route.params.id)
      return place || null
    },
  },
}
</script>

<style>
</style>
