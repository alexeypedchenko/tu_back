<template>
  <div class="file-manager-add-form">
    <v-dialog
      v-model="opened"
      width="500"
      @click:outside="close"
      @keydown.esc="close"
    >
      <v-card :loading="loading">
        <v-row align="center" justify="space-between" class="ma-0 px-5 py-2">
          <h3 class="text-body-1">
            Добавить новое изображение
          </h3>
          <v-btn
            icon
            @click="close"
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
          <v-file-input
            accept="image/*"
            label="Изображение"
            v-model="file.item"
            @change="fileInputChange"
          />
          <v-text-field
            v-model="file.name"
            label="Название"
            prepend-icon="mdi-text-short"
          />
          <v-row>
            <v-col v-if="getDirectories.length">
              <v-select
                :items="getDirectories"
                v-model="file.directory"
                label="Выбрать папку"
                prepend-icon="mdi-folder-outline"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="file.directory"
                label="Введите новоую папку"
                :prepend-icon="!getDirectories.length ? 'mdi-folder-outline' : ''"
              />
            </v-col>
          </v-row>
          <v-img
            contain
            max-height="300"
            max-width="100%"
            :src="file.localImage || 'https://via.placeholder.com/300x200/000000/FFFFFF/?text=your-image'"
          />
        </form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="submitNewFile"
            :disabled="!file.name || !file.directory || !file.item"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { uploadFile } from '~/firebase/api/file'

export default {
  name: 'FileManagerAddForm',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      file: {
        name: null,
        directory: null,
        item: null,
        localImage: null,
      },
    }
  },
  computed: {
    ...mapGetters('files', [
      'getDirectories',
    ])
  },
  methods: {
    fileInputChange(file) {
      if (file) {
        this.fileReader(file)
          .then((base64) => {
            this.file.item = file
            this.file.localImage = base64
            console.log('file.name:', file.name)
            this.file.name = file.name
          })
      } else {
        this.file.item = null
        this.file.localImage = null
      }
    },
    fileReader(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
          resolve(reader.result)
        }
      })
    },
    submitNewFile() {
      if (!this.file.name) {
        this.$toast.error('Введите название файла')
        return
      }
      if (!this.file.directory) {
        this.$toast.error('Введите название папки файла')
        return
      }
      if (!this.file.item) {
        this.$toast.error('Добавьте файл')
        return
      }
      const directory = this.file.directory
      this.$store.commit('files/loadingStart')
      uploadFile(this.file.item, this.file.name, directory)
        .then((url) => {
          const file = {
            name: this.file.name,
            directory: directory,
            path: url,
            created: new Date().toISOString()
          }
          this.$store.dispatch('files/createFile', file)
          this.clearNewFile()
          this.close()
        })
        .finally(() => this.$store.commit('files/loadingEnd'))
    },
    clearNewFile() {
      Object.keys(this.file).forEach((key) => {
        this.file[key] = null
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
