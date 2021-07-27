<template>
  <div class="filters-block">
    <v-text-field
      v-model="filters.type"
      label="type"
    />
    <v-text-field
      v-model="filters.town"
      label="town"
    />
    <v-combobox
      v-model="filters.region"
      :items="regions"
      label="Region"
      :search-input.sync="searchRegion"
    />
    <v-combobox
      v-model="filters.tags"
      :search-input.sync="searchTags"
      :items="tags"
      label="Список тегов"
      multiple
      chips
      hint="Press enter to create new Tag"
      persistent-hint
    />
  </div>
</template>

<script>
import { getObjectCopy, regions } from '~/assets/utils'
import { getFiltersScheme } from '~/assets/dbschemes'

export default {
  name: 'FiltersBlock',
  props: {
    incomingData: {
      type: Object,
      default: null,
    },
    tags: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      filters: getFiltersScheme(),
      regions: regions,
      searchRegion: null,
      searchTags: null,
    }
  },
  watch: {
    isChange() {
      this.emitData()
    },
    incomingData() {
      this.setIncomingData()
    }
  },
  computed: {
    isChange() {
      return JSON.stringify(this.filters)
    }
  },
  mounted() {
    if (this.incomingData) {
      this.setIncomingData()
    }
  },
  methods: {
    emitData() {
      this.$emit('input', this.filters)
    },
    setIncomingData() {
      this.filters = getObjectCopy(this.incomingData)
    }
  },
}
</script>

<style>
</style>
