<template>
  <div class="main-form">
    <v-form @submit.prevent>
      <v-row align="center" class="mb-2 ma-0">
        <h1 v-if="title" class="text-h4 mr-auto">
          {{ title }}
        </h1>

        <v-btn
          class="mr-5"
          color="success"
          @click="$emit('submit')"
          :loading="loading"
        >
          <!-- :disabled="isUpdate && place.author !== user.uid" -->
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
        >
          <!-- :disabled="place.author !== user.uid" -->
          <v-icon left>mdi-delete</v-icon>
          Удалить
        </v-btn>

        <v-btn
          v-if="backUrl"
          @click="$router.push(backUrl)"
        >
          <v-icon
            left
          >
            mdi-arrow-left
          </v-icon>
          Назад
        </v-btn>
      </v-row>

      <slot></slot>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline lighten-2">
            <!-- Удалить {{ this.place.name }}? -->
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
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'MainForm',
  props: {
    title: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
      default: '',
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog() {
      // if (!this.canUpdate()) return
      this.dialog = true
    },
    async deleteItem() {
      console.log('deleteItem:', deleteItem)
      // if (!this.canUpdate()) return
      // await this.$store.dispatch('places/deleteDoc', this.place._id)
      // this.$router.push('/places')
    },
  }
}
</script>

<style>
</style>
