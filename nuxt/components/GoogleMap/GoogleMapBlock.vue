<template>
  <div class="google-map-block">
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col>
            <v-text-field
              v-model="marker.coordinates.lat"
              label="Latitude: широта"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="marker.coordinates.lng"
              label="Longitude: долгота"
              required
            />
          </v-col>
        </v-row>

        <file-manager
          class="mb-2"
          title="Выбрать Изображение окна маркера"
          v-model="marker.image"
        />
        <v-img
          class="mb-5"
          contain
          position="top left"
          max-height="300"
          max-width="100%"
          :src="marker.image"
        />

        <file-manager
          class="mb-1"
          title="Выбрать иконку для маркера"
          v-model="marker.icon"
        />
        <v-img
          contain
          position="top left"
          max-height="30"
          max-width="100%"
          :src="marker.icon"
        />
      </v-col>
      <v-col cols="6">
        <google-map
          v-if="showMap"
          :change="mapChange"
          :item="{marker}"
          v-model="marker.coordinates"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getObjectCopy } from '~/assets/utils'
import { getMarkerScheme } from '~/assets/dbschemes'

export default {
  name: 'GoogleMapBlock',
  props: {
    incomingMarker: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      marker: getMarkerScheme(),
      mapChange: false,
      showMap: false,
    }
  },
  watch: {
    'marker.coordinates.lat'() {
      this.mapChange = !this.mapChange
    },
    'marker.coordinates.lng'() {
      this.mapChange = !this.mapChange
    },
    'marker.icon'() {
      this.mapChange = !this.mapChange
    },
    'marker.image'() {
      this.mapChange = !this.mapChange
    },
    mapChange() {
      this.emitMarker()
    }
  },
  mounted() {
    if (this.incomingMarker) {
      this.marker = getObjectCopy(this.incomingMarker)
    }
    this.showMap = true
  },
  methods: {
    emitMarker() {
      this.$emit('input', this.marker)
    }
  }
}
</script>

<style>
</style>
