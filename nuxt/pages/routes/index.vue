<template>
  <div class="routes">
    <data-table
      v-if="dataLoaded"
      title="Routes"
      storeName="routes"
      addUrl="add"
      :canEdit="true"
      :canDelete="true"
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
    const {dataLoaded} = store.state.routes
    if (!dataLoaded) {
      await store.dispatch('routes/getCollection')
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
    ...mapState('routes', [
      'dataLoaded',
      'loading',
      'list',
    ])
  },
}
</script>

<style>
</style>
