<template>
  <div class="list-wrap list-wrap-content" :data-order="data.order">
    <div class="list-placeholder" ref="placeHolder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          ref="listName"
          class="form-field-input"
          v-model="data.name"
          @mousedown.prevent
          @blur="updateListName"
        />
        <div class="extras-menu">
          <span class="icon icon-more"></span>
        </div>
      </div>

      <div class="list-cards">
        <t-card></t-card>
        <div class="list-card-add-form">
          <textarea
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success">添加卡片</button>
          <span class="icon icon-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from './TCard'
export default {
  name: 'TList',
  components: {
    TCard,
  },
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  mounted() {
    const header = this.$refs['listHeader']
    header.addEventListener('mousedown', this.dragDown)
    this.originalName = this.data.name
  },
  data() {
    return {
      drag: {
        //是否出发拖拽
        isDrag: false,
        //鼠标点击位置
        downClientX: 0,
        downClientY: 0,
        //元素 左上角坐标
        elementX: 0,
        elementY: 0,
      },
      originalName: '',
    }
  },

  methods: {
    dragDown(e) {
      document.addEventListener('mousemove', this.dragMove)
      document.addEventListener('mouseup', this.dragUp)
      this.drag.downClientX = e.clientX
      this.drag.downClientY = e.clientY
      const pos = this.$refs.list.getBoundingClientRect()
      this.drag.elementX = pos.x
      this.drag.elementY = pos.y
    },
    dragMove(e) {
      const x = e.clientX - this.drag.downClientX
      const y = e.clientY - this.drag.downClientY

      if (Math.abs(x) < 10 && Math.abs(y) < 10) return
      const listDom = this.$refs.list
      //start
      if (!this.drag.isDrag) {
        this.drag.isDrag = true
        document.body.appendChild(listDom)
        listDom.style.position = 'absolute'
        listDom.style.zIndex = '9999'
        listDom.style.transform = 'rotate(5deg)'

        this.$refs.placeHolder.style.height = listDom.offsetHeight + 'px'
        this.$emit('dragStart', {
          component: this,
        })
      }
      //moving
      listDom.style.left = this.drag.elementX + x + 'px'
      listDom.style.top = this.drag.elementY + y + 'px'
      this.$emit('dragMove', {
        component: this,
        x: e.clientX,
        y: e.clientY,
      })
    },
    dragUp(e) {
      document.removeEventListener('mousemove', this.dragMove)
      document.removeEventListener('mouseup', this.dragUp)
      //触发修改名称任务
      if (!this.drag.isDrag) {
        if (e.path.includes(this.$refs.listName)) {
          this.$refs.listName.select()
        }
        return
      }
      this.$refs.placeHolder.style.height = 0

      // 位置还原，移动上层div位置
      const listDom = this.$refs.list
      listDom.style.transform = 'rotate(0deg)'
      listDom.style.left = 0
      listDom.style.top = 0
      listDom.style.zIndex = 0
      listDom.style.position = 'relative'
      this.$el.appendChild(listDom)

      this.$emit('dragEnd', {
        component: this,
      })

      this.drag.isDrag = false
    },
    async updateListName(e) {
      const name = e.target.value
      if (name !== this.originalName) {
        await this.$store.dispatch('boardList/editBoardList', {
          id: this.data.id,
          name,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
