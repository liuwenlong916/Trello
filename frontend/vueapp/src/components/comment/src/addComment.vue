<template>
  <div class="comment-post">
    <div class="avatar">
      <span>{{ user.name[0].toUpperCase() }}</span>
    </div>
    <div class="comment-content-box editing">
      <textarea
        ref="content"
        class="comment-content-input"
        placeholder="添加评论……"
      ></textarea>
      <button class="btn btn-edit" @click="addComment">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addComment',
  // inject: ['cardId'],
  props: {
    cardId: {
      type: String,
      require: true,
    },
  },
  methods: {
    async addComment(e) {
      const content = this.$refs.content.value
      if (content.trim() == '') {
        this.$message.info('请输入评论')
        this.$refs.content.focus()
        return
      }
      try {
        await this.$store.dispatch('comment/addComment', {
          cardId: this.cardId,
          content,
        })
        this.$emit('updateComments')
        this.$refs.content.value = ''
        this.$message.success('添加成功')
      } catch (e) {}
    },
  },
  computed: {
    user() {
      return this.$store.state.user.info
    },
    // import {mapState} from 'vuex'
    // ...mapState('comment',{
    //   username:state.info.name
    // })
  },
}
</script>

<style lang="scss" scoped></style>
