<template>
  <router-link
    :to="{
      name: 'Card',
      params: { listId: data.boardListId, cardId: data.id },
    }"
    class="list-card"
  >
    <div
      v-if="coverPath"
      class="list-card-cover"
      :style="`background-image: url(${coverPath});`"
    ></div>
    <div class="list-card-title">{{ data.name }}</div>
    <div class="list-card-badges">
      <div class="badge" v-if="data.description">
        <span class="icon icon-description"></span>
      </div>
      <div class="badge" v-if="data.commentCount">
        <span class="icon icon-comment"></span>
        <span class="text">{{ data.commentCount }}</span>
      </div>
      <div
        class="badge"
        v-if="Array.isArray(data.attachments) && data.attachments.length > 0"
      >
        <span class="icon icon-attachment"></span>
        <span class="text">{{ data.attachments.length }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'TCard',
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  computed: {
    server() {
      return this.$store.state.server
    },
    coverPath() {
      let path = ''
      this.data.attachments.forEach(attachment => {
        if (attachment.isCover) {
          console.log(attachment)
          path = this.server.staticPath + attachment.path
        }
      })
      return path
    },
  },
}
</script>

<style lang="scss" scoped></style>
