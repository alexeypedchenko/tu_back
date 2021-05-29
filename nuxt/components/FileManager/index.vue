<template>
  <div class="file-manager">
    FileManager
    <div v-for="item in pageItems" :key="item">
      {{ item }}
    </div>
    <v-pagination
      v-model="page"
      :length="totalPages"
    />
    totalPages: {{ totalPages }}
  </div>
</template>

<script>
export default {
  name: 'FileManager',
  data() {
    return {
      page: 1,
      onPage: 3,
      items: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ],
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.onPage)
    },
    pageItems() {
      const startIndex = (this.page - 1) * this.onPage
      const endIndex = (this.page - 1) * this.onPage + this.onPage
      return this.items.slice(startIndex, endIndex)
    }
  }
}
</script>

<style>
</style>
