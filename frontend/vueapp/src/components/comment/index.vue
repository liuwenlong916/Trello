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
    <add-comment :cardId="cardId"></add-comment>
    <comment-list :cardId="cardId"></comment-list>
    <pagination />
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
      type: String,
      require: true,
    },
  },
}
</script>

<style scoped></style>
