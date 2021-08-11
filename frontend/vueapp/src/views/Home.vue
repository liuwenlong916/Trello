<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>
    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <!-- <li class="board-item">
          <span class="title">test</span>
        </li>
        <li class="board-item">
          <span class="title">共同努力吧！</span>
        </li>
        <li class="board-item">
          <span class="title">Welcome Board</span>
        </li> -->
        <template v-for="board in boards">
          <li class="board-item" :key="board.id">
            <span class="title">{{ board.name }}</span>
          </li>
        </template>
        <li class="board-item create-new-board">
          <textarea
            ref="name"
            class="title form-field-input"
            placeholder="创建新看板"
            @blur="handleAddBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from '@/components/THeader'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    THeader,
  },
  computed: {
    ...mapState('board', {
      boards: state => state.boards,
    }),
  },
  methods: {
    async handleAddBoard() {
      const name = this.$refs['name'].value
      if (name.trim() !== '') {
        try {
          await this.$store.dispatch('board/addBoard', { name })
          this.$message.success('面板创建成功')
          this.$refs['name'].value = ''
        } catch (e) {}
      }
    },
  },
  async created() {
    await this.$store.dispatch('board/getBoards')
  },
}
</script>

<style lang="scss" scoped></style>
