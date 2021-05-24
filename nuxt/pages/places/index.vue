<template>
  <div class="places">
    <v-row
      class="ma-0 mb-5"
      align="center"
      justify="space-between"
    >
      <h2 class="text-h2">
        Places
      </h2>
      <v-btn
        text
        color="success"
      >
        add new place
      </v-btn>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="places"
      :loading="loading"
      :items-per-page="5"
    ></v-data-table>
  </div>
</template>

<script>
import { getPlaces } from '~/firebase/firebaseApi'
export default {
  data() {
    return {
      places: [],
      loading: true,
      headers: [
        {
          text: 'Id',
          sortable: false,
          value: '_id',
        },
        {
          text: 'name',
          sortable: false,
          value: 'name',
        },
      ],
    }
  },
  mounted() {
    this.getPlaces()
  },
  methods: {
    async getPlaces() {
      await getPlaces()
        .then((res) => {
          this.places = res
          console.log('this.places:', this.places)
          setTimeout(() => {
            this.loading = false
          }, 100);
        })
    }
  }
}
</script>

<style>
</style>
