<template>
  <div class="google-map">
    <div class="google-map__actions">
      <div class="google-map__action" @click="centeredMap">
        Центрировать карту
      </div>
    </div>
    <div class="google-map__container">
    </div>
  </div>
</template>

<script>
import { GoogleMap } from '~/google/GoogleMap'

export default {
  name: 'GoogleMap',
  props: {
    change: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      map: null,
      pin: '/icons/pin.svg',
    }
  },
  watch: {
    change() {
      this.drawMarkers()
    },
    'map.coordinates'() {
      if (!this.map.coordinates) return
      this.$emit('input', this.map.coordinates)
    }
  },
  mounted() {
    this.map = new GoogleMap('.google-map__container', this.pin)
    this.map
      .init()
      .then(() => {
        this.drawMarkers()
      })
  },
  methods: {
    centeredMap() {
      this.map.centeredMap()
    },
    drawMarkers() {
      if (this.items) {
        this.map.setMarkers(this.items)
      }
      if (this.item) {
        this.map.setMarkers([this.item.marker])
      }
    }
  },
}
</script>

<style lang="scss">
.google-map {
  margin-bottom: 40px;
  position: relative;
}
.google-map__actions {
  display: flex;
  position: absolute;
  top: 10px;
  right: 60px;
  z-index: 1;
}
.google-map__action {
  height: 40px;
  background: #fff;
  font-size: 12px;
  padding: 0 10px;
  line-height: 40px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  text-align: center;
  cursor: pointer;
  color: rgba(#000, 0.75);
  transition: 0.3s;
  &:hover {
    color: #000;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
}
.google-map__container {
  min-height: 400px;
  height: 100%;
  width: 100%;
}
.custom-label-class {
  padding: 2px 4px;
  background: #fff;
}
</style>
