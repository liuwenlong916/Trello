<template>
  <div
    class="window-overlay"
    style="display: block"
    v-if="card && list"
    @click="hiddleCard"
  >
    <!--弹出式窗口-->
    <div class="popup" ref="popup">
      <div class="popup-header">
        <div class="popup-title">
          <div class="popup-title-icon">
            <span class="icon icon-card"></span>
          </div>
          <div class="popup-title-text">
            <textarea class="form-field-input" @blur="saveName">
              {{ card.name }}
              </textarea
            >
          </div>
          <div class="popup-title-detail">在列表 {{ list.name }} 中</div>
        </div>
        <a class="popup-header-close" @click="$router.back()">
          <i class="icon icon-close"></i>
        </a>
      </div>

      <div class="popup-content">
        <!--描述-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <span class="icon icon-description"></span>
            </div>
            <div class="title-text">
              <h3>描述</h3>
              <button class="btn btn-edit" @click="$refs.desc.select()">
                编辑
              </button>
            </div>
          </div>

          <p class="description">
            <textarea class="form-field-input" @blur="saveDesc" ref="desc">{{
              card.description
            }}</textarea>
          </p>
        </div>

        <!--附件-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <i class="icon icon-attachment"></i>
            </div>
            <div class="title-text">
              <h3>附件</h3>
            </div>
          </div>
          <t-attachments
            :attachments="card.attachments"
            :cardId="card.id"
          ></t-attachments>
          <div>
            <button class="btn btn-edit" @click="$refs.attachment.click()">
              添加附件
            </button>
            <input
              type="file"
              ref="attachment"
              style="display:none"
              @change="uploadAttachment"
            />
          </div>
        </div>

        <!--活动-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <i class="icon icon-activity"></i>
            </div>
            <div class="title-text">
              <h3>评论</h3>
            </div>
          </div>

          <div class="comment-post">
            <div class="avatar">
              <span>Z</span>
            </div>
            <div class="comment-content-box editing">
              <textarea
                class="comment-content-input"
                placeholder="添加评论……"
              ></textarea>
              <button class="btn btn-edit">保存</button>
            </div>
          </div>

          <ul class="comments">
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">非常不错！！</div>
              </div>
            </li>
          </ul>

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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TAttachments from '@/components/TAttachments'
export default {
  name: 'Card',
  components: {
    TAttachments,
  },
  computed: {
    list() {
      return this.$store.getters['boardList/getBoardList'](
        this.$route.params.listId,
      )
    },
    card() {
      return this.$store.getters['card/getCard'](this.$route.params.cardId)
    },
  },
  methods: {
    hiddleCard(e) {
      if (!e.path.includes(this.$refs.popup)) {
        this.$router.back()
      }
    },
    saveName(e) {
      this.editNameOrDesc(e, 'name')
    },
    saveDesc(e) {
      this.editNameOrDesc(e, 'description')
    },
    editNameOrDesc(e, tag) {
      const { value, innerHTML } = e.target
      if (value == innerHTML) {
        return
      }
      if (value.trim() == '') {
        // e.target.focus()
        // this.$message.info('卡片名称不能为空')
        e.target.value = e.target.innerHTML
        return
      }
      this.editCard({ [tag]: value })
    },
    editCard(data) {
      try {
        this.$store.dispatch('card/editCard', { ...data, id: this.card.id })
      } catch (e) {}
    },
    uploadAttachment() {
      const file = this.$refs.attachment.files[0]
      try {
        this.$store.dispatch('card/uploadAttachment', {
          cardId: this.card.id,
          file,
        })
      } catch (e) {}
      this.$refs.attachment.value = ''
      this.$message.success('上传成功')
    },
  },
}
</script>

<style lang="scss" scoped></style>
