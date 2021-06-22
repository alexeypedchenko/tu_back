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

        <delete-dialog
          v-if="isUpdate"
          @delete="deleteItem"
        />

        <exit-dialog
          v-if="backUrl"
          :backUrl="backUrl"
          :edited="edited"
        />
      </v-row>

      <div class="main-form__body">
        <slot></slot>
      </div>
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
    edited: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    deleteItem() {
      this.$emit('delete')
    },
  },
}
</script>

<style>
</style>
