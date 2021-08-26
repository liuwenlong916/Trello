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
      <div class="board" ref="board">
        <!--面板列表容器-->
        <template v-for="item in boardList">
          <t-list
            :data="item"
            :key="item.id"
            @dragStart="dragStart"
            @dragMove="dragMove"
            @dragEnd="dragEnd"
          ></t-list>
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
    server() {
      return his.$store.state.server
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
  methods: {
    dragStart({ component }) {
      const el = component.$el
      const board = el.parentNode
      const lists = [...board.querySelectorAll('.list-wrap-content')]
      el._index = lists.findIndex(list => list == el)
    },
    dragMove({ x, y, component }) {
      const el = component.$el
      const board = this.$refs.board
      const lists = [...board.querySelectorAll('.list-wrap-content')]
      const currIndex = lists.findIndex(item => item == el)
      lists.forEach((list, index) => {
        // .filter(list => list != el)会使index发生变化
        if (index === currIndex) return
        const clientRect = list.getBoundingClientRect()
        if (
          x >= clientRect.left &&
          x <= clientRect.right &&
          y >= clientRect.top &&
          y <= clientRect.bottom
        ) {
          if (currIndex < index) {
            board.insertBefore(el, list.nextElementSibling)
          } else if (currIndex > index) {
            board.insertBefore(el, list)
          }
        }
      })
    },
    async dragEnd({ component }) {
      const el = component.$el
      const board = el.parentNode
      const lists = [...board.querySelectorAll('.list-wrap-content')]
      const currIndex = lists.findIndex(item => item == el)
      if (currIndex !== el._index) {
        // console.log(el.dataset.order)
        let newOrder = 0
        const preOrder =
          currIndex - 1 > -1
            ? parseFloat(lists[currIndex - 1].dataset.order)
            : 0
        const nextOrder =
          currIndex + 1 < lists.length
            ? parseFloat(lists[currIndex + 1].dataset.order)
            : 0

        if (currIndex === 0) {
          newOrder = nextOrder / 2
        } else if (currIndex + 1 === lists.length) {
          newOrder = preOrder + 65535
        } else {
          newOrder = preOrder + (nextOrder - preOrder) / 2
        }
        console.log(preOrder, nextOrder, newOrder)
        await this.$store.dispatch('boardList/editBoardList', {
          order: newOrder,
          id: component.data.id,
          boardId: this.board.boardId,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
