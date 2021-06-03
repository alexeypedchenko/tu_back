<template>
  <div class="pagination">
    <v-row
      v-if="items.length"
      align="start"
      justify="end"
      class="ma-0 mt-10"
    >
      <v-select
        class="mr-5"
        :value="onPage"
        style="max-width: 200px"
        @change="changeOnPage"
        :items="onPageList"
        solo
        dense
      />
      <v-pagination
        v-model="page"
        :length="totalPages"
      />
    </v-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Pagination',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  watch: {
    paginatedItems() {
      this.emitPaginatedItems()
    }
  },
  computed: {
    ...mapState('pagination', [
      'onPage',
      'onPageList',
    ]),
    totalPages() {
      return Math.ceil(this.items.length / this.onPage)
    },
    startIndex() {
      return (this.page - 1) * this.onPage
    },
    endIndex() {
      return (this.page - 1) * this.onPage + this.onPage
    },
    paginatedItems() {
      return this.items.slice(this.startIndex, this.endIndex)
    },
  },
  mounted() {
    this.emitPaginatedItems()
  },
  methods: {
    emitPaginatedItems() {
      this.$emit('input', this.paginatedItems)
    },
    changeOnPage(value) {
      this.$store.commit('pagination/setOnPage', value)
    }
  }
}
</script>

<style>
</style>
