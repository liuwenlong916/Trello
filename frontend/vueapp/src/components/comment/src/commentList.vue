<template>
  <div v-if="commentList">
    <ul class="comments">
      <li class="comment" :key="comment.id" v-for="comment in commentList">
        <div class="avatar">
          <span>{{ comment.user.name[0].toUpperCase() }}</span>
        </div>
        <div class="description">
          <div class="header">
            <strong>{{ comment.user.name }}</strong>
            <span> at </span>
            <i>{{ comment.created | dateTime }}</i>
          </div>
          <div class="content">{{ comment.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import dateTime from '@/filters/dateTime'
export default {
  name: 'commentList',
  created() {
    this.getComments(this.page)
  },
  filters: {
    dateTime,
  },
  props: {
    cardId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      commentList: [],
    }
  },
  computed: {
    ...mapState('comment', {
      page: state => state.page,
    }),
  },
  methods: {
    async getComments(page) {
      try {
        this.commentList = await this.$store.dispatch('comment/getComments', {
          cardId: this.cardId,
          page,
        })
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
