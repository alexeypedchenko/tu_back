<template>
  <place-form
    :title="isUpdate ? `Изменить ${place.name}` : 'Добавить новое место'"
    backUrl="/places"
    actionName="places"
    :loading="loading"
    :list="list"
    :isUpdate="isUpdate"
    :incomingPlace="place"
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
      return this.list.find((place) => place._id === this.$route.params.id)
    },
    isUpdate() {
      return !!this.place
    }
  },
}
</script>

<style>
</style>
