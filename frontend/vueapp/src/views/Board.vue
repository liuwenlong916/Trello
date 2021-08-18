<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>
    <!--正文-->
    <main>
      <h2 v-if="board">
        {{ board.name }}
        <span class="btn btn-icon"> 邀请 </span>
      </h2>

      <!--面板容器-->
      <div class="board">
        <!--面板列表容器-->
        <template v-for="item in boardList">
          <t-list :data="item" :key="item.id"></t-list>
        </template>

        <!--无内容列表容器-->
        <t-add-list v-if="board" :boardId="board.id" />
      </div>
    </main>

    <!--弹窗，可用于对话框、弹出式菜单等-->
    <!--弹出式菜单-->

    <!--遮罩层-->
    <router-view></router-view>
  </div>
</template>

<script>
import THeader from '@/components/THeader'
import TAddList from '@/components/TAddList'
import TList from '@/components/TList'
export default {
  name: 'Board',
  components: {
    THeader,
    TAddList,
    TList,
  },
  computed: {
    board() {
      return this.$store.getters['board/getBoard'](this.$route.params.id)
    },
    boardList() {
      return this.$store.getters['boardList/getBoardLists'](
        this.$route.params.id,
      )
    },
  },
  created() {
    if (!this.board) {
      this.$store.dispatch('board/getBoard', this.$route.params.id)
    }
    if (!this.boardList || !this.boardList.length) {
      this.$store.dispatch('boardList/getBoardLists', this.$route.params.id)
    }
  },
}
</script>

<style lang="scss" scoped></style>
