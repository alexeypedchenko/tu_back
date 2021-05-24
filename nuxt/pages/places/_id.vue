<template>
  <div class="place">
    place: {{ id }}
    <place-form :place="place"/>
  </div>
</template>

<script>
import PlaceForm from '~/components/forms/PlaceForm'

export default {
  components: {
    PlaceForm,
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    place() {
      return {}
    }
  }
}
</script>

<style>
</style>
