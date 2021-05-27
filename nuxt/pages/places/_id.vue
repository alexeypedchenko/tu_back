<template>
  <div class="place">
    <h2 class="text-h4 mb-10">
      Изменить {{ place.name }}
    </h2>

    <place-form
      :isUpdate="true"
      :incomingPlace="place"
    />
  </div>
</template>

<script>
import PlaceForm from '~/components/forms/PlaceForm'

export default {
  components: {
    PlaceForm,
  },
  computed: {
    place() {
      return this.$store.state.places.list.find((place) => place._id === this.$route.params.id)
    },
  }
}
</script>

<style>
</style>
