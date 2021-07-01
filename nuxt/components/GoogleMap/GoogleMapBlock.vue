<template>
  <div class="google-map-block">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="marker.name"
          label="Название места"
        />
        <v-text-field
          v-model="marker.description"
          label="Описание места"
        />
        <v-row>
          <v-col>
            <v-text-field
              v-model="marker.coordinates.lat"
              label="Latitude: широта"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="marker.coordinates.lng"
              label="Longitude: долгота"
            />
          </v-col>
        </v-row>

        <file-manager
          class="mb-2"
          title="Изображение окна маркера"
          v-model="marker.image"
          :preview="marker.image"
        />

        <file-manager
          class="mb-1"
          title="Иконка маркера"
          v-model="marker.icon"
          :preview="marker.icon"
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
    incomingData: {
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
    isChange() {
      this.mapChange = !this.mapChange
      this.emitMarker()
    },
    incomingData() {
      this.setIncomingData()
    }
  },
  computed: {
    isChange() {
      return JSON.stringify(this.marker)
    }
  },
  mounted() {
    if (this.incomingData) {
      this.setIncomingData()
    }
    this.showMap = true
  },
  methods: {
    emitMarker() {
      console.log('this.marker:', this.marker)
      this.$emit('input', this.marker)
    },
    setIncomingData() {
      this.marker = getObjectCopy(this.incomingData)
    }
  },
}
</script>

<style lang="scss">
  .map-window {
    width: 300px;
  }
  .map-window-img {
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .map-window-content {}
  .map-window-title {}
  .map-window-text {}
  .map-window-description {}
</style>
