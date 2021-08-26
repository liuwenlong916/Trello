<template>
  <div>
    <ul class="attachments">
      <li
        class="attachment"
        :key="attachment.id"
        v-for="attachment in attachments"
      >
        <div
          class="attachment-thumbnail"
          :style="
            `background-image: url('${server.staticPath}${attachment.path}');`
          "
        ></div>
        <p class="attachment-detail">
          <span class="attachment-thumbnail-name">
            <strong>{{ attachment.detail.originName }}</strong>
          </span>
          <span class="attachment-thumbnail-descriptions">
            <span class="datetime">{{ attachment.updatedAt | dateTime }}</span>
            <span> - </span>
            <u @click="deleteAttachment(attachment.id)">删除</u>
          </span>
          <span class="attachment-thumbnail-operation">
            <i class="icon icon-card-cover"></i>
            <u v-if="attachment.isCover" @click="removeCover(attachment.id)"
              >移除封面</u
            >
            <u v-else @click="setCover(attachment.id)">设为封面</u>
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import dateTime from '@/filters/dateTime'
export default {
  name: 'TAttachments',
  props: {
    attachments: {
      type: Array,
      require: true,
    },
    cardId: {
      type: String | Number,
      require: true,
    },
  },

  filters: {
    dateTime,
  },
  computed: {
    server() {
      return this.$store.state.server
    },
  },
  methods: {
    deleteAttachment(attachmentId) {
      this.$store.dispatch('card/deleteAttachment', {
        attachmentId,
        cardId: this.cardId,
      })
    },
    removeCover(attachmentId) {
      this.$store.dispatch('card/removeCover', {
        cardId: this.cardId,
        attachmentId,
      })
    },
    setCover(attachmentId) {
      this.$store.dispatch('card/setCover', {
        cardId: this.cardId,
        attachmentId,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
