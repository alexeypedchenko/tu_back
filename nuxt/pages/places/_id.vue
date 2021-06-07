<template>
  <place-form
    :title="`Изменить ${place.name}`"
    :isUpdate="true"
    :incomingPlace="place"
  />
</template>

<script>
import { mapState } from 'vuex'
import PlaceForm from '~/components/PlaceForm'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getCollection')
    }
  },
  components: {
    PlaceForm,
  },
  computed: {
    ...mapState('places', [
      'list',
    ]),
    place() {
      return this.list.find((place) => place._id === this.$route.params.id)
    },
  }
}
</script>

<style>
</style>
