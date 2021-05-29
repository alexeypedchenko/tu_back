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
        color="success"
        @click="$router.push('/places/add')"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        add new place
      </v-btn>
    </v-row>

    <data-table
      v-if="list && list.length"
      :headers="headers"
      :list="list"
      :loading="loading"
      editUrl="/places"
      @delete="deleteItem"
    />
  </div>
</template>

<script>
import DataTable from '~/components/DataTable'
import { mapState } from 'vuex'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getPlaces')
    }
  },
  components: {
    DataTable,
  },
  data() {
    return {
      headers: [
        {
          text: 'Is published',
          value: 'public',
          sortable: true,
        },
        {
          text: 'Created',
          value: 'created',
          sortable: true,
        },
        {
          text: 'Edited',
          value: 'edited',
          sortable: true,
        },
        {
          text: 'Id',
          value: '_id',
          sortable: false,
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
    }
  },
  computed: {
    ...mapState('places', [
      'loading',
      'list',
    ])
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch('places/deletePlace', id)
    },
  }
}
</script>

<style>
</style>
