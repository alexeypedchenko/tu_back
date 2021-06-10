<template>
  <div class="DefaultFields">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="object.name"
          label="Название места"
          required
        />
        <v-text-field
          v-model="object.type"
          label="Тип места"
          required
        />
        <v-text-field
          v-model="object.description"
          label="Описание"
          required
        />
        <v-text-field
          v-model="object.town"
          label="Город"
          required
        />
        <v-text-field
          v-model="object.region"
          label="Регион || Область"
          required
        />
        <!-- tags -->
        <v-combobox
          v-model="object.tags"
          label="Список тегов"
          multiple
          chips
        />
      </v-col>
      <v-col cols="6">
        <file-manager
          class="mb-4"
          v-model="object.image"
        />
        <v-img
          contain
          position="top left"
          max-height="300"
          max-width="100%"
          :src="object.image || ''"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getObjectCopy } from '~/assets/utils'
import { getDefaultFields } from '~/assets/dbschemes'

export default {
  name: 'DefaultFields',
  props: {
    incomingObject: {
      type: Object,
      default: null,
    },
  },
  watch: {
    isUpdate() {
      console.log('isUpdate')
    }
  },
  data() {
    return {
      object: {
        ...getDefaultFields()
      }
    }
  },
  computed: {
    isUpdate() {
      return JSON.stringify(this.object)
    }
  },
  mounted() {
    if (this.incomingObject) {
      this.object = getObjectCopy(this.incomingObject)
    }
  }
}
</script>

<style>
</style>
