<template>
  <div class="data-table">
    <v-row
      v-if="title || addUrl"
      class="ma-0 mb-5"
      align="center"
    >
      <h2
        v-if="title"
        class="text-h2"
      >
        {{ title }}
      </h2>

      <v-btn
        class="ml-auto"
        v-if="addUrl"
        color="success"
        @click="$router.push(`${storeName}/${addUrl}`)"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        add new
      </v-btn>
    </v-row>

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
          v-if="canEdit"
          icon
          color="primary"
          class="mr-2"
          :disabled="item.author !== user.uid"
          @click="editItem(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-if="canDelete"
          icon
          color="error"
          :disabled="item.author !== user.uid"
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
    addedHeaders: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    storeName: {
      type: String,
      default: '',
    },
    addUrl: {
      type: String,
      default: '',
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  name: 'DataTable',
  data() {
    return {
      headers: [
        ...this.addedHeaders,
        {
          text: 'Is published',
          value: 'public',
          sortable: true,
        },
        {
          text: 'Created',
          value: 'created',
          sortable: true,
        },
        {
          text: 'Edited',
          value: 'edited',
          sortable: true,
        },
        {
          text: 'Id',
          value: '_id',
          sortable: false,
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      search: '',
      dialog: false,
      deleteItemId: null,
    }
  },
  methods: {
    editItem({_id, author}) {
      if (!this.canUpdate(author)) return
      this.$router.push(`${this.storeName}/${_id}`)
    },
    openDialog({_id, author}) {
      if (!this.canUpdate(author)) return
      this.dialog = true
      this.deleteItemId = _id
    },
    deleteItem() {
      this.$store.dispatch(`${this.storeName}/deleteDoc`, this.deleteItemId)
      this.dialog = false
    },
    searchFilter(value, search, item) {
      search = search.toLowerCase()
      return value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search) !== -1
    },
    canUpdate(author) {
      if (author !== this.user.uid) {
        this.$toast.error('У вас нет прав для редактирования!')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>
</style>
