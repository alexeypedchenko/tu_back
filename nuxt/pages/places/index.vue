<template>
  <div class="places">
    <data-table
      v-if="dataLoaded"
      title="Places"
      storeName="places"
      addUrl="add"
      :canEdit="true"
      :canDelete="false"
      :list="list"
      :loading="loading"
      :addedHeaders="headers"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.markers
    if (!dataLoaded) {
      await store.dispatch('markers/getCollection')
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapState('markers', [
      'dataLoaded',
      'loading',
      'list',
    ])
  },
}
</script>

<style>
</style>
