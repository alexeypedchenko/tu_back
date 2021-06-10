<template>
  <div class="route-form">
    <main-form
      :title="isUpdate ? `Изменить ${incomingObject.name}` : 'Добавить новое место'"
      :loading="loading"
      :isUpdate="isUpdate"
      :backUrl="backUrl"
      :actionName="actionName"
      :object="getCopiedObject"
    >
      <v-row class="mb-4 ma-0">
        <v-switch
          inset
          v-model="route.public"
          label="Опубликовать"
        />
      </v-row>
      <v-card>
        <v-tabs
          v-model="activeTab"
          background-color="deep-purple accent-4"
          dark
        >
          <v-tab>
            <v-icon left>mdi-map-outline</v-icon>
            Карта
          </v-tab>
        </v-tabs>

        <v-tabs-items class="pa-4" v-model="activeTab">
          <v-tab-item transition="fade-transition">
            <google-map-route
              :list="places"
              :selected="route.markers"
              v-model="route.markers"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </main-form>
  </div>
</template>

<script>
import { getObjectCopy } from '~/assets/utils'
import { getRouteScheme } from '~/assets/dbschemes'

export default {
  name: 'PlaceForm',
  props: {
    actionName: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
      default: '',
    },
    incomingObject: {
      type: Object,
      default: null,
    },
    places: {
      type: Array,
      default: () => ([]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: 0,
      route: getRouteScheme(),
    }
  },
  computed: {
    edited() {
      if (this.isUpdate) {
        return JSON.stringify(this.route) !== JSON.stringify(this.incomingObject)
      } else {
        return JSON.stringify(this.route) !== JSON.stringify(getRouteScheme())
      }
    },
    getCopiedObject() {
      return getObjectCopy(this.route)
    },
    isUpdate() {
      return !!this.incomingObject
    },
  },
  mounted() {
    if (this.isUpdate) {
      this.route = getObjectCopy(this.incomingObject)
    }
  },
}
</script>

<style lang="scss">
</style>
