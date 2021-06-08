<template>
  <div class="delete-dialog">
    <v-btn @click="handleClick">
      <v-icon
        left
      >
        mdi-arrow-left
      </v-icon>
      Назад
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-center justify-center">
          Выйти без сохранения?
        </v-card-title>

        <v-card-actions class="justify-center">
          <v-btn
            color="error"
            text
            @click="goBack"
          >
            <v-icon left>mdi-exit-to-app</v-icon>
            Да
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            <v-icon left>mdi-cancel</v-icon>
            Нет
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
    backUrl: {
      type: String,
      default: '',
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    handleClick() {
      if (this.edited) {
        this.openDialog()
      } else {
        this.goBack()
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    goBack() {
      this.$router.push(this.backUrl)
    }
  }
}
</script>

<style>
</style>
