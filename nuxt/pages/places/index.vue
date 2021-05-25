<template>
  <div class="places">
    <v-row
      class="ma-0 mb-5"
      align="center"
      justify="space-between"
    >
      <h2 class="text-h2">
        Places
      </h2>

      <v-btn
        text
        color="success"
        @click="$router.push('/places/add')"
      >
        add new place
      </v-btn>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="list"
      :loading="loading"
      :items-per-page="5"
    >
      <template
        v-slot:item.actions="{ item }"
      >
        <v-btn color="primary" icon class="mr-2" @click="editItem(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn color="error" icon @click="openDialog(item)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Удалить {{ this.itemId }}?
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Id',
          sortable: false,
          value: '_id',
        },
        {
          text: 'name',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      dialog: false,
      itemId: null,
    }
  },
  computed: {
    ...mapState('places', [
      'loading',
      'list',
    ])
  },
  methods: {
    editItem({_id}) {
      console.log('_id:', _id)
      // this.$store.dispatch('places/getPlaces')
    },
    openDialog({_id}) {
      this.dialog = true
      this.itemId = _id
    },
    deleteItem() {
      this.$store.dispatch('places/deletePlace', this.itemId)
      this.dialog = false
    },
  }
}
</script>

<style>
</style>
