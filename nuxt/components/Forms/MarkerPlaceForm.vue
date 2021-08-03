<template>
  <div class="place-form">
    <main-form
      :title="getTitle"
      :loading="loading"
      :isUpdate="isUpdate"
      :backUrl="backUrl"

      @submit="submit"
      @delete="deleteItem"
    >
      <v-row class="mb-4 ma-0">
        <v-switch
          inset
          v-model="marker.public"
          label="Опубликовать"
        />
      </v-row>

      <v-tabs
        v-model="activeTab"
        background-color="deep-purple accent-4"
        dark
      >
        <v-tab>
          <v-icon left>mdi-map-outline</v-icon>
          Карта
        </v-tab>
        <v-tab>
          <v-icon left>mdi-clipboard-list-outline</v-icon>
          Фильтры
        </v-tab>
        <v-tab>
          <v-icon left>mdi-page-layout-header-footer</v-icon>
          Страница места
        </v-tab>
        <v-tab>
          <v-icon left>mdi-clipboard-text-outline</v-icon>
          SEO
        </v-tab>
      </v-tabs>

      <v-tabs-items class="pa-4" v-model="activeTab">
        <v-tab-item transition="fade-transition">
          <google-map-block
            :incomingData="marker"
            v-model="marker"
          />
        </v-tab-item>

        <v-tab-item transition="fade-transition">
          <forms-filters-block
            :incomingData="marker"
            :tags="tags"
            v-model="marker"
          />
        </v-tab-item>

        <v-tab-item transition="fade-transition">
          <v-card class="pa-4 mb-4">
            <h2 class="text-h4 mb-4">
              Описание страницы
            </h2>
            <v-text-field
              class="mb-5"
              v-model="place.slug"
              label="Название в адресной строке (slug)"
              hint="Должно быть уникальным!"
              persistent-hint
            />
            <v-text-field
              v-model="place.name"
              label="Название места"
            />
            <v-text-field
              v-model="place.description"
              label="Описание места"
            />
            <file-manager
              title="Изображение места"
              v-model="place.image"
              :preview="place.image"
            />
          </v-card>
          <v-card class="pa-4">
            <page-builder
              :incomingBlocks="place.pageBlocks"
              v-model="place.pageBlocks"
            />
          </v-card>
        </v-tab-item>

        <v-tab-item transition="fade-transition">
          <main-form-seo-block
            :incomingData="place.seo"
            v-model="place.seo"
          />
        </v-tab-item>
      </v-tabs-items>
    </main-form>
  </div>
</template>

<script>
import {
  getMarkerScheme,
  getPlaceScheme
} from '~/assets/dbschemes'
import { getObjectCopy } from '~/assets/utils'

export default {
  name: 'PlaceForm',
  props: {
    backUrl: {
      type: String,
      default: '',
    },
    incomingMarker: {
      type: Object,
      default: null,
    },
    incomingPlace: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      activeTab: 0,
      marker: getMarkerScheme(),
      place: getPlaceScheme(),
    }
  },
  computed: {
    edited() {
      if (this.isUpdate) {
        return (
          JSON.stringify(this.marker) !== JSON.stringify(this.incomingMarker)
          || JSON.stringify(this.place) !== JSON.stringify(this.incomingPlace)
        )
      } else {
        return (
          JSON.stringify(this.place) !== JSON.stringify(getPlaceScheme())
          || JSON.stringify(this.marker) !== JSON.stringify(getMarkerScheme())
        )
      }
    },
    isUpdate() {
      return !!this.incomingMarker && !!this.incomingPlace
    },
    getTitle() {
      return this.isUpdate ? `${this.incomingMarker.name}, ${this.incomingPlace.name}` : 'Добавить новое место'
    },
  },
  mounted() {
    if (this.isUpdate) {
      this.setIncomingObjects()
    }
  },
  methods: {
    async submit() {
      if (this.isUpdate) {
        await this.update()
      } else {
        await this.create()
      }
    },
    async update() {
      await this.$store.dispatch('markers/updateDoc', getObjectCopy(this.marker))
      await this.$store.dispatch('places/updateDoc', getObjectCopy(this.place))
      this.$toast.success('Данные успешно обновлены!')
    },
    async create() {
      // создаем и связываем обьекты ссылками друг на друга
      await this.$store.dispatch('markers/createDoc', getObjectCopy(this.marker)).then((id) => {
        this.marker._id = id
        this.place.markerId = id
      })
      await this.$store.dispatch('places/createDoc', getObjectCopy(this.place)).then((id) => {
        this.place._id = id
        this.marker.placeId = id
      })
      this.$toast.success('Новые объекты успешно созданы!')
      await this.update()
      // this.$router.push(this.backUrl)
    },
    async deleteItem() {
      await this.$store.dispatch('places/deleteDoc', this.place._id)
      await this.$store.dispatch('markers/deleteDoc', this.marker._id)
      this.$router.push(this.backUrl)
    },
    setIncomingObjects() {
      this.marker = getObjectCopy(this.incomingMarker)
      this.place = getObjectCopy(this.incomingPlace)
    }
  }
}
</script>

<style lang="scss">
</style>
