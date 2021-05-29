<template>
  <div class="data-table">
    <v-data-table
      :headers="headers"
      :items="list"
      :loading="loading"
      :items-per-page="5"
      :search="search"
      :custom-filter="searchFilter"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template
        v-if="headers.find((item) => (item.value === 'public'))"
        #item.public="{ item }"
      >
        <v-icon
          v-if="item.public"
          color="success"
        >
          mdi-eye-check-outline
        </v-icon>
        <v-icon
          v-else
          color="error"
        >
          mdi-eye-off-outline
        </v-icon>
      </template>
      <template
        v-if="headers.find((item) => (item.value === 'created'))"
        #item.created="{ item }"
      >
        <v-icon left>
          mdi-newspaper-plus
        </v-icon>
        {{ dataFormat(item.created) }}
      </template>
      <template
        v-if="headers.find((item) => (item.value === 'edited'))"
        #item.edited="{ item }"
      >
        <v-icon left>
          mdi-pencil-outline
        </v-icon>
        {{ dataFormat(item.edited) }}
      </template>
      <template
        v-if="headers.find((item) => (item.value === 'actions'))"
        #item.actions="{ item }"
      >
        <v-btn
          color="primary"
          icon
          class="mr-2"
          v-if="editUrl"
          @click="editItem(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          color="error"
          icon
          @click="openDialog(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

     <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Удалить {{ this.deleteItemId }}?
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
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    headers: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false,
    },
    editUrl: {
      type: String,
      default: '',
    },
  },
  name: 'DataTable',
  data() {
    return {
      search: '',
      dialog: false,
      deleteItemId: null,
    }
  },
  methods: {
    editItem({_id}) {
      this.$router.push(`${this.editUrl}/${_id}`)
    },
    openDialog({_id}) {
      this.dialog = true
      this.deleteItemId = _id
    },
    deleteItem() {
      this.$emit('delete', this.deleteItemId)
      this.dialog = false
    },
    searchFilter(value, search, item) {
      search = search.toLowerCase()
      return value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search) !== -1
    },
  }
}
</script>

<style>
</style>
