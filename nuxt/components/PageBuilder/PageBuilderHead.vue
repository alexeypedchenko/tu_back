<template>
  <div class="page-builder-head">
    <v-row align="center" class="ma-0 mb-4">
      <h2 class="text-h4 mr-auto">
        Блоки страницы
      </h2>

      <v-btn
        color="primary"
        class="mr-5"
        dark
        @click="dialog = true"
      >
        <v-icon
          left
        >
          mdi-plus
        </v-icon>
        Добавить блок
      </v-btn>
    </v-row>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>Выбрать блок</v-card-title>
        <v-divider></v-divider>
        <v-card-text
          style="height: 300px;"
          class="pa-4"
        >
          <v-chip
            v-for="block in blocks"
            :key="block.id"
            style="width: 100%"
            class="mb-3"
            label
            outlined
            @click="addBlock(block.type)"
          >
            <v-icon left>
              mdi-{{ block.icon }}
            </v-icon>
            <div style="width: 200px; text-align: center;">
              {{ block.name }}
            </div>
            <v-icon right>
              mdi-{{ block.icon }}
            </v-icon>
          </v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getObjectCopy } from '~/assets/utils'
export default {
  name: 'PageBuilderHead',
  props: {
    blocks: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    addBlock(type) {
      const block = getObjectCopy(this.blocks.find((block) => block.type === type))
      this.$emit('addBlock', block)
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
