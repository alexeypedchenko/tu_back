<template>
  <div class="routes">
    <data-table
      v-if="list && list.length"
      title="Places"
      addUrl="/places/add"
      editUrl="/places"
      deleteAction="places/deleteDoc"
      :headers="headers"
      :list="list"
      :loading="loading"
    />
  </div>
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
}
</script>

<style>
</style>
