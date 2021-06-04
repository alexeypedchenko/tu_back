<template>
  <div>
    <place-form
      :formTitle="`Изменить ${place.name}`"
      :isUpdate="true"
      :incomingPlace="place"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlaceForm from '~/components/PlaceForm'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getPlaces')
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
