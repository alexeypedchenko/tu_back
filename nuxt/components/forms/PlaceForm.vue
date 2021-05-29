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
          color="error"
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
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- описание -->
        <v-tab-item transition="fade-transition">
          <v-row>
            <v-col>
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
              <v-text-field
                v-model="place.region"
                label="Город"
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
            <v-col>
              Изображение
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- карта -->
        <v-tab-item transition="fade-transition">
          <v-row>
            <v-col>
              <v-text-field
                v-model="place.marker.coordinates.lat"
                label="Latitude: широта"
                required
              />
              <v-text-field
                v-model="place.marker.coordinates.lng"
                label="Longitude: долгота"
                required
              />
              Изображение
            </v-col>
            <v-col>
              <google-map
                v-if="showMap"
                :change="mapChange"
                :item="place"
                @newCoordinates="setNewCoordinates"
              />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoogleMap from '~/components/GoogleMap'

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
  },
  data() {
    return {
      tab: 0,
      showMap: false,
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
          img: 'https://via.placeholder.com/120x80?text=img-place',
          coordinates: {
            lng: 32.07230514,
            lat: 46.64288927
          }
        },
        img: 'https://via.placeholder.com/1920x1080?text=img-place',
      },
      mapChange: false,
    }
  },
  watch: {
    place(beforeData, afterData) {
      console.log('afterData:', afterData)
      console.log('beforeData:', beforeData)
    },
    'place.marker.coordinates.lat'() {
      this.mapChange = !this.mapChange
    },
    'place.marker.coordinates.lng'() {
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
      if (this.isUpdate) {
        this.$store.dispatch('places/updatePlace', this.place)
      } else {
        this.place.created = currentDate
        this.$store.dispatch('places/createPlace', this.place)
      }
    },
    setNewCoordinates(coordinates) {
      this.place.marker.coordinates = coordinates
    },
  }
}
</script>

<style lang="scss">
</style>
