<template>
  <div class="comment-pagination">
    <div class="pagination">
      <span @click="gotoPage(1)">首页</span>
      <span v-if="page > 1" @click="gotoPage(page - 1)">上一页</span>
      <span v-if="showPages[0] > 1">...</span>
      <template v-for="showpage in showPages">
        <span
          :key="showpage"
          :class="{ 'current-page': page == showpage }"
          @click="gotoPage(showpage)"
        >
          {{ showpage }}
        </span>
      </template>
      <span v-if="pages > showPages[showPages.length - 1]">...</span>
      <span v-if="page != pages">下一页</span>
      <span @click="gotoPage(pages)">尾页</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'pagination',
  props: {
    cardId: {
      type: Number,
      require: true,
    },
  },
  computed: {
    ...mapState('comment', {
      pages: state => state.pages,
      page: state => state.page,
    }),
    showPages() {
      return this.$store.getters['comment/showPages']
    },
  },
  methods: {
    gotoPage(page) {
      // this.$store.dispatch('comment/getComments', {
      //   cardId: this.cardId,
      //   page,
      // })
      this.$store.commit('comment/updatePage', page)
      this.$emit('updateComments')
    },
  },
}
</script>

<style lang="scss" scoped></style>
