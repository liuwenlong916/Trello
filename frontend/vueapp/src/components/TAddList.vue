<template>
  <div class="list-wrap no-content" :class="{ 'list-adding': listAdding }">
    <div class="list-add" @click="showListAdding">
      <span class="icon icon-add"></span>
      <span>添加另一个列表</span>
    </div>

    <div class="list">
      <div class="list-cards">
        <div class="list-card-add-form">
          <input
            ref="newListName"
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
            v-model="name"
          />
        </div>
      </div>

      <div class="list-footer">
        <div class="list-add-confirm">
          <button class="btn btn-success" @click="addList">添加列表</button>
          <span class="icon icon-close" @click="hideListAdding"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TAddList',
  props: {
    boardId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      listAdding: false,
      name: '',
    }
  },
  methods: {
    showListAdding() {
      this.listAdding = true
      this.$nextTick(() => {
        this.$refs.newListName.focus()
      })
    },
    hideListAdding() {
      this.listAdding = false
    },
    async addList() {
      if (this.name.trim() == '') {
        this.$refs['newListName'].focus()
        this.$message.info('请输入看板名称')
        return
      }
      try {
        await this.$store.dispatch('boardList/addBoardList', {
          name: this.name,
          boardId: this.boardId,
        })
        this.name = ''
        this.$message.success('提交成功')
        // this.listAdding = false
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
