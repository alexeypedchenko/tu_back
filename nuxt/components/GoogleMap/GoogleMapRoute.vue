<template>
  <v-row class="google-map-route">
    <v-col cols="6">
      <v-combobox
        v-model="items"
        :items="list"
        class="mb-4"
        :menu-props="{ maxHeight: '260' }"
        label="Выбрать места для маршрута"
        multiple
        item-text="name"
        return-object
        placeholder="Введите новое место:"
      >
        <template v-slot:selection="{ item }">
          <v-chip style="cursor: pointer">
            <span>{{ item.name }}</span>
          </v-chip>
        </template>
      </v-combobox>

      <h3 v-if="items.length" class="text-subtitle-2 mb-2">
        Отсортируйте места по направлению вашего маршрута:
      </h3>
      <SlickList class="google-map-route-list" v-model="items">
        <SlickItem class="google-map-route-item" v-for="(item, index) in items" :index="index" :key="index">
          <span>
            {{ item.name }}
          </span>
          <v-icon>
            mdi-sort
          </v-icon>
        </SlickItem>
      </SlickList>
    </v-col>

    <v-col cols="6">
      <google-map
        v-if="showMap"
        :change="mapChange"
        :items="items"
      />
    </v-col>
  </v-row>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';

export default {
  name: 'GoogleMapRoute',
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    selected: {
      type: Array,
      default: null,
    },
  },
  components: {
    SlickList,
    SlickItem,
  },
  data() {
    return {
      items: [],
      mapChange: false,
      showMap: false,
    }
  },
  watch: {
    items() {
      this.mapChange = !this.mapChange
      const idList = this.items.map((item) => item._id)
      this.$emit('input', idList)
      if (this.items.length) {
        this.showMap = true
      } else {
        this.showMap = false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fillItems()
    })
  },
  methods: {
    fillItems() {
      if (!this.selected) return
      this.selected.forEach((item) => {
        const marker = this.list.find((el) => el._id === item)
        this.items.push(marker)
        // this.$set(this.localItems, this.localItems.length, marker)
      })
    }
  }
}
</script>

<style lang="scss">
.google-map-route-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
  background: #fff;
  border-radius: 3px;
  padding: 8px;
  cursor: pointer;
  justify-content: space-between;
}
</style>