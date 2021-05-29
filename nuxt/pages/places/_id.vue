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
