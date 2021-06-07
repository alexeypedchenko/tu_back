<template>
  <v-card class="page-builder-block">
    <v-card-title class="page-builder-block-head">
      <span>
        {{ capitalize(type) }} block
      </span>

      <div>
        <v-btn
          icon
          @click="togglePublished"
        >
          <v-icon v-if="published" color="success">
            mdi-eye
          </v-icon>
          <v-icon v-else color="primary">
            mdi-eye-off
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="deleteItem"
        >
          <v-icon color="error">
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-handle
          icon
        >
          <v-icon>
            mdi-sort
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <template v-if="type === 'text'">
        <v-text-field
          label="Введите текст"
          @input="change"
          :value="prop"
        />
      </template>
      <template v-if="type === 'texteditor'">
        <quill-editor
          :content="prop"
          @change="change($event.html)"
        />
      </template>
      <template v-if="type === 'image'">
        <FileManager
          class="mb-4"
          @input="change"
        />
        <v-img
          contain
          position="top left"
          max-height="300"
          max-width="100%"
          :src="prop"
        />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { ElementMixin, HandleDirective } from 'vue-slicksort';

export default {
  name: 'PageBuilderBlock',
  mixins: [ElementMixin],
  directives: { handle: HandleDirective },
  props: {
    type: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change(value) {
      const props = {
        [this.type]: value
      }
      this.$emit('input', props)
      this.$emit('change')
    },
    togglePublished() {
      this.$emit('togglePublished', {
        index: this.index,
        published: !this.published
      })
    },
    deleteItem() {
      this.$emit('deleteItem', this.index)
    },
  }
}
</script>

<style lang="scss">
.page-builder-block {
  .v-text-field .v-label {
    transform-origin: top left;
  }
}
.page-builder-block-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ql-editor {
  min-height: 150px;
}
</style>
