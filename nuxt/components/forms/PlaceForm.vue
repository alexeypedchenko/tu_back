<template>
  <div class="place-form">
    <v-form
      @submit.prevent="submit"
    >
      <v-text-field
        class="mb-5"
        v-model="place.name"
        label="Название места"
        required
      />
      <v-text-field
        class="mb-5"
        v-model="place.type"
        label="Тип места"
        required
      />
      <v-text-field
        class="mb-5"
        v-model="place.description"
        label="Описание"
        required
      />
      <v-btn
        type="submit"
        color="primary"
        :loading="loading"
      >
        Отправить
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlaceForm',
  data() {
    return {
      place: {
        name: 'Place 1',
        img: 'https://via.placeholder.com/1920x1080?text=img-place',
        type: 'Парк',
        description: 'some description',
        town: 'Odessa',
        region: 'Odessa Region',
        tags: [
          'tag1',
          'tag2',
          'tag3'
        ],
        marker: {
          icon: 'https://via.placeholder.com/30x30?text=pin',
          img: 'https://via.placeholder.com/120x80?text=img-place',
          coordinates: {
            lng: 32.07230514,
            lat: 46.64288927
          }
        },
      }
    }
  },
  computed: {
    ...mapState('places', [
      'loading',
      'list',
    ])
  },
  methods: {
    submit() {
      this.place.edited = new Date(),
      this.$store.dispatch('places/createPlace', this.place)
    }
  }
}
</script>

<style lang="scss">
.place-form {
  width: 600px;
}
</style>
