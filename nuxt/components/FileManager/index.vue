<template>
  <div class="file-manager">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title :title="title">
          {{ title }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="ml-5"
          color="primary"
          @click="showAddForm = true"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Добавить
        </v-btn>
        <v-btn
          class="ml-5"
          :disabled="!this.selectedImages.length"
          color="success"
          @click="emitImages"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Выбрать
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

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
                <img
                  :src="image.path"
                />
                <v-icon
                  class="file-manager__image-selected"
                  v-if="selectedImages.includes(image)" color="primary"
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

    <v-dialog
      v-model="showAddForm"
      width="500"
    >
      <v-card>
        <v-row align="center" justify="space-between" class="ma-0 px-5 py-2">
          <h3 class="text-body-1">
            Добавить новое изображение
          </h3>
          <v-btn
            icon
            @click="showAddForm = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-row>

        <v-divider></v-divider>

        <form
          @submit.prevent
          class="px-5 py-2"
        >
          <v-text-field
            v-model="file.name"
            label="Папка"
            prepend-icon="mdi-folder-outline"
            required
          />
          <v-text-field
            v-model="file.folder"
            label="Имя"
            prepend-icon="mdi-text-short"
            required
          />
          <v-file-input
            accept="image/*"
            label="Изображение"
            v-model="file.item"
            @change="fileInputChange"
          />
          <v-img
            contain
            max-height="300"
            max-width="100%"
            :src="'https://via.placeholder.com/300x200/000000/FFFFFF/?text=your-image' || ''"
          />
        </form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="showAddForm = false"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadFile } from '~/firebase/api/file'
import Pagination from '~/components/Pagination'

export default {
  name: 'FileManager',
  components: {
    AppPagination: Pagination,
  },
  props: {
    multiply: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      showAddForm: false,
      paginatedItems: {},
      activeTab: 0,
      selectedImages: [],
      title: `Файл менеджер: ${this.multiply ? 'выберите несколько изображений' : 'выберите одно изображение' }`,
      file: {
        name: '',
        folder: '',
        item: null,
        localImage: '',
      },
    }
  },
  computed: {
    ...mapState('files', [
      'list',
      'dataLoaded',
    ]),
    groupImages() {
      const arr = this.list.reduce((acc, val) => {
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
      return arr
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
      if (
        !this.multiply &&
        this.selectedImages.length === 1 &&
        !this.selectedImages.includes(image)
      ) {
        this.selectedImages = [image]
        return
      }

      if (this.selectedImages.includes(image)) {
        this.selectedImages = this.selectedImages
          .filter((selectedImage) => selectedImage !== image)
        return
      }
      this.selectedImages.push(image)
    },
    emitImages() {
      const result = this.selectedImages.map((image) => image.path)
      if (this.multiply) {
        this.$emit('input', result)
      } else {
        this.$emit('input', result[0])
      }
    },
    fileInputChange(file) {
      console.log('file:', file)
      this.file.name
      this.file.folder
      this.file.item
      this.file.localImage
    },
    submitNewFile() {
      console.log('submitNewFile:')
      return
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

  &:hover {
    border-color: #1976d2;
  }

  img {
    max-height: 150px;
    max-width: 150px;
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
</style>
