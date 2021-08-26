<template>
  <div class="comment-pagination">
    <div class="pagination">
      <span>首页</span>
      <span>上一页</span>
      <span>...</span>
      <span>4</span>
      <span>5</span>
      <span class="current-page">6</span>
      <span>7</span>
      <span>8</span>
      <span>...</span>
      <span>下一页</span>
      <span>尾页</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'pagination',
  computed: {
    ...mapState('comment', {
      pages: state => state.pages,
      page: state => state.page,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
