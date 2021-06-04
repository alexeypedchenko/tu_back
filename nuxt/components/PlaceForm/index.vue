<template>
  <div class="place-form">
    <v-form @submit.prevent>
      <!-- actions -->
      <v-row align="center" class="mb-2 ma-0">
        <h1 v-if="formTitle" class="text-h4 mr-auto">
          {{ formTitle }}
        </h1>

        <v-btn
          class="mr-5"
          color="success"
          @click="submit"
          :loading="loading"
          :disabled="isUpdate && place.author !== user.uid"
        >
          <v-icon
            left
          >
            mdi-check
          </v-icon>
          <template v-if="isUpdate">
            Сохранить
          </template>
          <template v-else>
            Отправить
          </template>
        </v-btn>

        <v-btn
          v-if="isUpdate"
          class="mr-5"
          color="error"
          @click="openDialog()"
          :disabled="place.author !== user.uid"
        >
          <v-icon left>mdi-delete</v-icon>
          Удалить
        </v-btn>

        <v-btn
          @click="$router.push('/places')"
        >
          <v-icon
            left
          >
            mdi-arrow-left
          </v-icon>
          Назад
        </v-btn>
      </v-row>
      <v-row class="mb-4 ma-0">
        <v-switch
          inset
          v-model="place.public"
          label="Опубликовать"
        ></v-switch>
      </v-row>

      <v-tabs
        v-model="tab"
        class="mb-5"
        dark
        background-color="cyan"
      >
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab>
          <v-icon left>mdi-file-document-outline</v-icon>
          Описание
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-outline</v-icon>
          Карта
        </v-tab>
        <v-tab>
          <v-icon left>mdi-plus-box-multiple</v-icon>
          Текстовые блоки
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- описание -->
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
                v-model="localFiles.image"
                :hasSelected="!!localFiles.image"
                @clearSelected="localFiles.image = null"
              />
              <v-img
                contain
                position="top left"
                max-height="300"
                max-width="100%"
                :src="localFiles.image || place.image"
              />
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- карта -->
        <v-tab-item transition="fade-transition">
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="place.marker.coordinates.lat"
                    label="Latitude: широта"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="place.marker.coordinates.lng"
                    label="Longitude: долгота"
                    required
                  />
                </v-col>
              </v-row>

              <file-manager
                class="mb-2"
                title="Выбрать Изображение окна маркера"
                v-model="place.marker.image"
                :hasSelected="!!localFiles.markerImage"
                @clearSelected="localFiles.markerImage = null"
              />
              <v-img
                class="mb-5"
                contain
                position="top left"
                max-height="300"
                max-width="100%"
                :src="localFiles.markerImage || place.marker.image"
              />

              <file-manager
                class="mb-1"
                title="Выбрать иконку для маркера"
                v-model="place.marker.icon"
                :hasSelected="!!localFiles.markerIcon"
                @clearSelected="localFiles.markerIcon = null"
              />
              <v-img
                contain
                position="top left"
                max-height="30"
                max-width="100%"
                :src="localFiles.markerIcon || place.marker.icon"
              />
            </v-col>
            <v-col cols="6">
              <google-map
                v-if="showMap"
                :change="mapChange"
                :item="place"
                @newCoordinates="setNewCoordinates"
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item transition="fade-transition">
          <page-builder
            class="ma-1"
            :incomingBlocks="place.pageBlocks"
            v-model="place.pageBlocks"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-form>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Удалить {{ this.place.name }}?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="deleteItem"
          >
            Delete
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uploadFile } from '~/firebase/api/file'
import { mapState } from 'vuex'
import GoogleMap from '~/components/GoogleMap'
import FileManager from '~/components/FileManager'

export default {
  name: 'PlaceForm',
  props: {
    formTitle: {
      type: String,
      default: '',
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    incomingPlace: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    GoogleMap,
    FileManager,
  },
  data() {
    return {
      dialog: false,
      tab: 0,
      showMap: false,
      localFile: null,
      localFiles: {
        image: null,
        markerImage: null,
        markerIcon: null,
      },
      place: {
        public: false,
        name: 'Place 1',
        type: 'Парк',
        description: 'some description',
        town: 'Odessa',
        region: 'Odessa Region',
        tags: [
          'tag 1',
          'tag 2',
          'tag 3',
        ],
        marker: {
          icon: 'https://via.placeholder.com/30x30?text=pin',
          image: 'https://via.placeholder.com/120x80?text=img-place',
          coordinates: {
            lng: 32.07230514,
            lat: 46.64288927
          }
        },
        image: 'https://via.placeholder.com/1920x1080?text=img-place',
        pageBlocks: [],
      },
      mapChange: false,
    }
  },
  watch: {
    'place.marker.coordinates.lat'() {
      this.mapChange = !this.mapChange
    },
    'place.marker.coordinates.lng'() {
      this.mapChange = !this.mapChange
    },
    'place.marker.icon'() {
      this.mapChange = !this.mapChange
    },
    'place.marker.image'() {
      this.mapChange = !this.mapChange
    },
  },
  computed: {
    ...mapState('places', [
      'loading',
      'list',
    ]),
  },
  mounted() {
    if (this.isUpdate) {
      this.place = JSON.parse(JSON.stringify(this.incomingPlace))
    }
    this.showMap = true
  },
  methods: {
    submit() {
      const currentDate = new Date().toISOString()
      this.place.edited = currentDate
      this.localFiles.image ? this.place.image = this.localFiles.image : ''
      if (this.isUpdate) {
        if (!this.canUpdate()) return
        this.$store.dispatch('places/updatePlace', this.place)
      } else {
        this.place.author = this.user.uid
        this.place.created = currentDate
        this.$store.dispatch('places/createPlace', this.place)
      }
    },
    setNewCoordinates(coordinates) {
      this.place.marker.coordinates = coordinates
    },
    fileInputChange(file) {
      if (!file) {
        this.localFiles.image = null
        return
      }
      const directory = 'places'
      const dateNow = Date.now()
      const name = `image_${dateNow}`
      uploadFile(file, name, directory)
        .then((url) => {
          const file = {
            name: name,
            directory: directory,
            path: url,
          }
          this.$store.dispatch('files/createFile', file)
          this.localFiles.image = url
        })
    },
    openDialog() {
      if (!this.canUpdate()) return
      this.dialog = true
    },
    async deleteItem() {
      if (!this.canUpdate()) return
      await this.$store.dispatch('places/deletePlace', this.place._id)
      this.$router.push('/places')
    },
    canUpdate() {
      if (this.place.author !== this.user.uid) {
        this.$toast.error('У вас нет прав для редактирования!')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
</style>
