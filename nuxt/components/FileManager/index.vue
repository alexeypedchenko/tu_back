<template>
  <div class="file-manager">
    <v-dialog
      v-model="opened"
      @click:outside="close"
      @keydown.esc="close"
    >
      <v-card :loading="loading">
        <file-manager-head
          @add="showAddForm = true"
          @choice="emitImages"
          :selected="!!this.selectedImages.length"
          @close="close"
        />

        <div v-if="dataLoaded">
          <v-tabs v-model="activeTab">
            <v-tab
              v-for="item in Object.keys(groupImages)"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab">
            <v-tab-item
              transition="fade-transition"
              v-for="item in Object.keys(groupImages)"
              :key="item"
            >
              <div class="file-manager__image-list">
                <div
                  class="file-manager__image"
                  v-for="image in paginatedItems[item]"
                  :key="image.name"
                  @click="selectImage(image)"
                >
                  <span>
                    {{ image.name }}
                  </span>
                  <img
                    :src="image.path"
                  />
                  <v-icon
                    class="file-manager__image-selected"
                    v-if="selectedImages.includes(image)" color="primary"
                    large
                  >
                    mdi-check-circle
                  </v-icon>
                </div>
              </div>
              <app-pagination
                :items="groupImages[item]"
                v-model="paginatedItems[item]"
              />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card>

      <file-manager-add-form
        :loading="loading"
        :opened="showAddForm"
        @close="showAddForm = false"
      />
    </v-dialog>

    <div
      v-if="title"
      class="text-subtitle-2 mb-1 file-manager__title"
    >
      {{ title }}:
    </div>
    <div class="file-manager__actions">
      <v-btn
        @click="open"
        color="success"
        text
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        Выбрать изображение
      </v-btn>

      <v-btn
        v-if="hasSelected"
        @click="$emit('clearSelected')"
        color="error"
        text
      >
        <v-icon left>
          mdi-image-minus
        </v-icon>
        Убрать изображение
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '~/components/Pagination'

export default {
  name: 'FileManager',
  components: {
    AppPagination: Pagination,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    multiply: {
      type: Boolean,
      default: false,
    },
    hasSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paginatedItems: {},
      activeTab: 0,
      selectedImages: [],
      showAddForm: false,
      opened: false,
    }
  },
  computed: {
    ...mapState('files', [
      'list',
      'dataLoaded',
      'loading',
    ]),
    groupImages() {
      const images = this.list.reduce((acc, val) => {
        if (acc[val.directory]) {
          acc[val.directory].push(val)
        } else {
          acc[val.directory] = [val]
          // добавим в обьект для пагнации пустой массив с названием коллекции картинок
          // с помощью метода 'set' сделаем массив реактивным
          this.$set(this.paginatedItems, [val.directory], [])
        }
        return acc
      }, {})

      Object.keys(images)
        .forEach((key) => {
          images[key].sort((first, second) => {
            return new Date(second.created).getTime() - new Date(first.created).getTime()
          })
        })

      return images
    }
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    async getFiles() {
      if (this.dataLoaded) return
      await this.$store.dispatch('files/getCollection')
    },
    selectImage(image) {
      // if (
      //   !this.multiply &&
      //   this.selectedImages.length === 1 &&
      //   !this.selectedImages.includes(image)
      // ) {
      //   this.selectedImages = [image]
      //   return
      // }

      if (this.selectedImages.includes(image)) {
        this.selectedImages = this.selectedImages
          .filter((selectedImage) => selectedImage !== image)
        return
      }
      this.selectedImages.push(image)
    },
    emitImages() {
      const result = this.selectedImages.map((image) => image.path)

      if (result.length === 0) {
        this.$toast.error('Выберите изображения!')
        return
      }

      if (!this.multiply && result.length > 1) {
        this.$toast.error('Выберите одно изображение!')
        return
      }

      if (this.multiply && result.length > 1) {
        this.$emit('input', result)
      } else {
        this.$emit('input', result[0])
      }

      this.clearSelectedImages()
      this.close()
    },
    clearSelectedImages() {
      this.selectedImages = []
    },
    close() {
      this.opened = false
    },
    open() {
      this.opened = true
    }
  }
}
</script>

<style lang="scss">
.file-manager__image-list {
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 10px;
  }
}
.file-manager__image {
  position: relative;
  border: 1px solid transparent;
  transition: border-color 0.3s;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 4px;

  &:hover {
    border-color: #1976d2;
    span {
      opacity: 1;
    }
  }

  span {
    transition: 0.3s;
    background: rgba(#000, 0.9);
    color: #fff;
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    border-radius: 3px;
    padding: 5px;
    opacity: 0;
    font-size: 12px;
  }

  img {
    height: 150px;
    width: 150px;
    object-fit: contain;
  }
}
.file-manager__image-selected {
  background: #fff;
  border-radius: 50%;
  position: absolute !important;
  bottom: 0;
  right: 0;
}
.file-manager__actions {
  & > *:not(:last-child) {
    margin-right: 16px;
  }
}
</style>
