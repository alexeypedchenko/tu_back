<template>
  <div class="delete-dialog">
    <v-btn
      class="mr-5"
      color="error"
      @click="openDialog"
    >
      <!-- :disabled="place.author !== user.uid" -->
      <v-icon left>mdi-delete</v-icon>
      Удалить
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-center justify-center">
          Подтвердить удаление {{ name }}
        </v-card-title>

        <v-card-actions class="justify-center">
          <v-btn
            color="error"
            text
            @click="$emit('delete')"
          >
            <v-icon left>mdi-delete</v-icon>
            Delete
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            <v-icon left>mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
  }
}
</script>

<style>
</style>
