<template>
  <div class="place-form">
    edited: {{ edited }}
    <pre>
      {{ getPlaceCopy }}
    </pre>
    <main-form
      :title="title"
      :loading="loading"
      :isUpdate="isUpdate"
      :backUrl="backUrl"
      :edited="edited"
      :actionName="actionName"
      :object="getPlaceCopy"
    >
      <v-row class="mb-4 ma-0">
        <v-switch
          inset
          v-model="place.public"
          label="Опубликовать"
        />
      </v-row>
      <v-card>
        <v-tabs
          v-model="activeTab"
          background-color="deep-purple accent-4"
          dark
        >
          <!-- background-color="cyan" -->
          <v-tab>
            <v-icon left>mdi-file-document-outline</v-icon>
            Описание
          </v-tab>
          <v-tab>
            <v-icon left>mdi-map-outline</v-icon>
            Карта
          </v-tab>
          <v-tab>
            <v-icon left>mdi-page-layout-header-footer</v-icon>
            Блоки страницы
          </v-tab>
        </v-tabs>

        <!-- описание -->
        <v-tabs-items class="pa-4" v-model="activeTab">
          <v-tab-item transition="fade-transition">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="place.name"
                  label="Название места"
                  required
                />
                <v-text-field
                  v-model="place.type"
                  label="Тип места"
                  required
                />
                <v-text-field
                  v-model="place.description"
                  label="Описание"
                  required
                />
                <v-text-field
                  v-model="place.town"
                  label="Город"
                  required
                />
                <v-text-field
                  v-model="place.region"
                  label="Регион || Область"
                  required
                />
                <!-- tags -->
                <v-combobox
                  v-model="place.tags"
                  label="Список тегов"
                  multiple
                  chips
                />
              </v-col>
              <v-col cols="6">
                <file-manager
                  class="mb-4"
                  v-model="place.image"
                />
                <v-img
                  contain
                  position="top left"
                  max-height="300"
                  max-width="100%"
                  :src="place.image || ''"
                />
              </v-col>
            </v-row>
          </v-tab-item>

          <!-- карта -->
          <v-tab-item transition="fade-transition">
            <google-map-block
              v-model="place.marker"
              :incomingMarker="place.marker"
            />
          </v-tab-item>

          <!-- статические блоки -->
          <v-tab-item transition="fade-transition">
            <page-builder
              :incomingBlocks="place.pageBlocks"
              v-model="place.pageBlocks"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </main-form>
  </div>
</template>

<script>
import { getPlaceScheme } from '~/assets/dbschemes'

export default {
  name: 'PlaceForm',
  props: {
    title: {
      type: String,
      default: '',
    },
    actionName: {
      type: String,
      default: '',
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    backUrl: {
      type: String,
      default: '',
    },
    incomingPlace: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: 0,
      place: getPlaceScheme(),
    }
  },
  computed: {
    edited() {
      if (this.isUpdate) {
        return JSON.stringify(this.place) !== JSON.stringify(this.incomingPlace)
      } else {
        return JSON.stringify(this.place) !== JSON.stringify(getPlaceScheme())
      }
    },
    getPlaceCopy() {
      return JSON.parse(JSON.stringify(this.place))
    },
  },
  mounted() {
    if (this.isUpdate) {
      this.place = JSON.parse(JSON.stringify(this.incomingPlace))
    }
  },
}
</script>

<style lang="scss">
</style>
