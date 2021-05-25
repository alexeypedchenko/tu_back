<template>
  <div class="place-add">
    <h2 class="text-h4 mb-10">
      Добавить новое место
    </h2>

    <place-form />
  </div>
</template>

<script>
import PlaceForm from '~/components/forms/PlaceForm'

export default {
  components: {
    PlaceForm,
  },
}
</script>

<style>
</style>
