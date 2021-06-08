<template>
  <div class="PageBuilder">
    <page-builder-head
      :blocks="blocks"
      @addBlock="addBlock"
      :localBlocks="localBlocks.length"
      @save="save"
    />

    <SlickList
      v-if="showList"
      v-model="localBlocks"
      :useDragHandle="true"
    >
      <PageBuilderBlock
        class="mb-5"
        v-for="(block, index) in localBlocks"
        :index="index"
        :key="index"
        v-model="localBlocks[index].props"
        :type="block.type"
        :prop="block.props ? block.props[block.type] : null"
        :published="block.published"
        @togglePublished="togglePublished"
        @deleteItem="deleteItem"
        @change="save"
      />
    </SlickList>
  </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';

function getBlockData(name, type, icon = type) {
  return {
    name,
    type,
    icon,
    props: null,
    published: true,
  }
}

export default {
  name: 'PageBuilder',
  components: {
    SlickItem,
    SlickList
  },
  props: {
    incomingBlocks: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      showList: true,
      blocks: [
        getBlockData('Text block', 'text'),
        getBlockData('Texteditor block', 'texteditor', 'playlist-edit'),
        getBlockData('Image block', 'image'),
      ],
      localBlocks: [
        ...this.incomingBlocks
      ],
    }
  },
  watch: {
    localBlocks(beforeData, afterData) {
      if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {
        this.save()
      }
    }
  },
  methods: {
    addBlock(block) {
      block.id = Date.now(),
      this.localBlocks.push(block)
      // this.$set(this.localBlocks, this.localBlocks.length, block)
    },
    save() {
      this.$emit('input', this.localBlocks)
    },
    togglePublished({index, published}) {
      this.localBlocks[index].published = published
    },
    deleteItem(index) {
      this.localBlocks.splice(index, 1)
    },
  }
}
</script>
