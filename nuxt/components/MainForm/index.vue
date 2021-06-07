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
          @delete="$emit('delete')"
        />

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
  },
}
</script>

<style>
</style>
