<template>
  <div class="file-manager-head">
    <v-toolbar flat>
      <v-toolbar-title :title="title">
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="ml-5"
        color="primary"
        @click="$emit('add')"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Добавить
      </v-btn>

      <v-btn
        class="ml-5"
        :disabled="!selected"
        color="success"
        @click="$emit('choice')"
      >
        <v-icon left>
          mdi-check
        </v-icon>
        Выбрать
      </v-btn>

      <v-btn
        class="ml-4 mr-0"
        @click="$emit('close')"
        icon
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'FileManagerHead',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: 'Файл менеджер',
    }
  }
}
</script>

<style>
</style>
