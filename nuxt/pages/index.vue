<template>
  <div class="home">
    <h1 class="text-h1 mb-5">
      home
    </h1>
    <PageBuilder
      :incomingBlocks="blocks"
      v-model="blocks"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: []
    }
  },
}
</script>

<style lang="scss">
</style>