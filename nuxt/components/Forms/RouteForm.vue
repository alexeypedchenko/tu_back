<template>
  <div class="route-form">
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
          v-model="route.public"
          label="Опубликовать"
        />
      </v-row>

      <v-tabs
        v-model="activeTab"
        background-color="deep-purple accent-4"
        dark
      >
        <v-tab>
          <v-icon left>mdi-clipboard-text-outline</v-icon>
          Описание
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-outline</v-icon>
          Маршрут
        </v-tab>
      </v-tabs>

      <v-tabs-items class="pa-4" v-model="activeTab">
        <v-tab-item transition="fade-transition">
          <v-card class="pa-4 mb-4">
            <h2 class="text-h4 mb-4">
              Описание маршрута
            </h2>
            <v-text-field
              v-model="route.name"
              label="Название маршрута"
            />
            <v-text-field
              v-model="route.description"
              label="Описание маршрута"
            />
          </v-card>
          <file-manager
            title="Изображение маршрута"
            v-model="route.image"
            :preview="route.image"
          />
        </v-tab-item>
        <v-tab-item transition="fade-transition">
          <google-map-route
            :list="markers"
            :selected="route.markers"
            v-model="route.markers"
          />
        </v-tab-item>
      </v-tabs-items>
    </main-form>
  </div>
</template>

<script>
import { getObjectCopy } from '~/assets/utils'
import { getRouteScheme } from '~/assets/dbschemes'

export default {
  name: 'PlaceForm',
  props: {
    backUrl: {
      type: String,
      default: '',
    },
    incomingObject: {
      type: Object,
      default: null,
    },
    markers: {
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
    isUpdate() {
      return !!this.incomingObject
    },
    getTitle() {
      return this.isUpdate ? `Изменить ${this.incomingObject.name}` : 'Добавить новый маршрут'
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
      await this.$store.dispatch('routes/updateDoc', getObjectCopy(this.route)).then(() => {
        this.$toast.success('Маршрут успешно обновлен!')
      })
    },
    async create() {
      await this.$store.dispatch('routes/createDoc', getObjectCopy(this.route)).then((id) => {
        this.$toast.success('Новый маршрут успешно создан!')
        this.$router.push(this.backUrl)
      })
    },
    async deleteItem() {
      await this.$store.dispatch('routes/deleteDoc', this.route._id)
      this.$router.push(this.backUrl)
    },
    setIncomingObjects() {
      this.route = getObjectCopy(this.incomingObject)
    },
  }
}
</script>

<style lang="scss">
</style>
