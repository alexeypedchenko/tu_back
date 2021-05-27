<template>
  <div class="place-form">
    <v-form
      @submit.prevent="submit"
    >
      <!-- actions -->
      <v-row align="center" class="mb-10 ma-0">
        <h2 v-if="formTitle" class="text-h2 mr-auto">
          {{ formTitle }}
        </h2>

        <v-btn
          class="mr-5"
          type="submit"
          color="success"
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

      <v-row>
        <v-col cols="6">
          <h3 class="text-h3 mb-5">
            Описание
          </h3>
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
          <v-text-field
            v-model="newTag"
            clear-icon="mdi-plus"
            clearable
            label="Добавить новый тэг"
            @click:clear="addNewTag"
          ></v-text-field>
          <v-select
            v-model="place.tags"
            :items="allTags"
            label="Список тэгов"
            multiple
            chips
          ></v-select>
        </v-col>
        <v-col cols="6">
          <h3 class="text-h3 mb-5">
            Карта
          </h3>
          <!-- marker -->
          <v-text-field
            v-model="place.marker.name"
            label="Название места"
            required
          />
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
          
          
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  data() {
    return {
      newTag: '',
      allTags: [
        'tag 1',
        'tag 2',
        'tag 3',
      ],
      place: {
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
          name: '',
          coordinates: {
            lng: 32.07230514,
            lat: 46.64288927
          }
        },
        img: 'https://via.placeholder.com/1920x1080?text=img-place',
      }
    }
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
  },
  methods: {
    submit() {
      // this.place.edited = new Date()
      console.log('this.place:', this.place)
      if (this.isUpdate) {
        this.$store.dispatch('places/updatePlace', this.place)
      } else {
        this.$store.dispatch('places/createPlace', this.place)
      }
    },
    addNewTag() {
      const tag = this.newTag.trim().toLowerCase()
      this.allTags.push(tag)
      this.place.tags.push(tag)
      this.newTag = ''
    }
  }
}
</script>

<style lang="scss">
.place-form {
  // width: 600px;
}
</style>
