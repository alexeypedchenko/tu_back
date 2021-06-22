<template>
  <div
    v-if="seo"
    class="seo-block"
  >
    <v-text-field
      v-model="seo.title"
      label="SEO Title"
      @input="change"
    />
    <v-text-field
      v-model="seo.description"
      label="SEO Description"
      @input="change"
    />
    <v-text-field
      v-model="seo.keywords"
      label="SEO Keywords"
      @input="change"
    />
  </div>
</template>

<script>
import {getSeoScheme} from '~/assets/dbschemes'
import { getObjectCopy } from '~/assets/utils'
export default {
  name: 'SeoBlock',
  props: {
    incomingData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      seo: getSeoScheme(),
    }
  },
  watch: {
    incomingData() {
      this.setIncomingData()
    }
  },
  mounted() {
    if(this.incomingData) {
      this.setIncomingData()
    }
  },
  methods: {
    change() {
      this.$emit('input', this.seo)
    },
    setIncomingData() {
      this.seo = getObjectCopy(this.incomingData)
    }
  }
}
</script>

<style>
</style>
