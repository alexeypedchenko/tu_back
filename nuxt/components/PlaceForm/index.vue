<template>
  <div class="place-form">
    <main-form
      :title="title"
      :loading="loading"
      :isUpdate="isUpdate"
      backUrl="/places"
      @submit="submit"
    >
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
          <v-icon left>mdi-page-layout-header-footer</v-icon>
          Блоки страницы
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
                v-model="localFiles.markerImage"
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
                v-model="localFiles.markerIcon"
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
    </main-form>
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
    title: {
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
      tab: 0,
      showMap: false,
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
      this.setImages()
      if (this.isUpdate) {
        if (!this.canUpdate()) return
        this.$store.dispatch('places/updateDoc', this.getPlaceCopy())
      } else {
        this.place.author = this.user.uid
        this.$store.dispatch('places/createDoc', this.getPlaceCopy())
      }
      this.clearLocalFiles()
      // перейдем на страницу мест
      // this.$router.push('/places')
    },
    getPlaceCopy() {
      return JSON.parse(JSON.stringify(this.place))
    },
    setImages() {
      this.localFiles.image ? this.place.image = this.localFiles.image : ''
      this.localFiles.markerImage ? this.place.marker.image = this.localFiles.markerImage : ''
      this.localFiles.markerIcon ? this.place.marker.icon = this.localFiles.markerIcon : ''
    },
    clearLocalFiles() {
      Object.keys(this.localFiles).forEach((key) => {
        this.localFiles[key] = null
      })
    },
    setNewCoordinates(coordinates) {
      this.place.marker.coordinates = coordinates
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
