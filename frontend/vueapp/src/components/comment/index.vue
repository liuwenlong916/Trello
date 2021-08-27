<template>
  <div class="window-module">
    <div class="title">
      <div class="title-icon">
        <i class="icon icon-activity"></i>
      </div>
      <div class="title-text">
        <h3>评论</h3>
      </div>
    </div>
    <add-comment
      :cardId="cardId"
      @updateComments="updateComments"
    ></add-comment>
    <comment-list :cardId="cardId" ref="commentList"></comment-list>
    <pagination :cardId="cardId" @updateComments="updateComments" />
  </div>
</template>

<script>
import addComment from './src/addComment'
import commentList from './src/commentList'
import pagination from './src/pagination'
export default {
  name: 'Comment',
  components: {
    addComment,
    commentList,
    pagination,
  },
  // inject: ['cardId'],
  props: {
    cardId: {
      type: Number,
      require: true,
    },
  },
  computed: {
    page() {
      return this.$store.state.comment.page
    },
  },
  methods: {
    updateComments() {
      this.$refs.commentList.getComments(this.page)
    },
  },
}
</script>

<style scoped></style>
