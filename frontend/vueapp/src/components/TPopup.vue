<template>
  <div class="popup-container">
    <div @click="open">
      <slot></slot>
    </div>
    <div>
      <div class="popup" v-show="isShow" ref="popup">
        <div class="popup-header">
          <span class="popup-title">{{ title }}</span>
          <a class="popup-header-close" @click="close" ref="close">
            <i class="icon icon-close"></i>
          </a>
        </div>

        <div class="popup-content">
          <ul class="popup-menu-list">
            <li><span>添加卡…</span></li>
            <li><span>复制列表…</span></li>
            <li><span>移动列表</span></li>
            <li><span>关注 </span></li>
          </ul>
          <hr />
          <ul class="popup-menu-list">
            <li><span>移动此列表中的所有卡片…</span></li>
            <li><span>归档这个列表中的所有卡…</span></li>
          </ul>
          <hr />
          <ul class="popup-menu-list">
            <li><span>将此列表进行归档</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TPopup',
  props: {
    title: {
      type: String,
      default: '弹出菜单',
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    open() {
      this.isShow = !this.isShow
      window.addEventListener('click', this.close)
      this.$nextTick(() => {
        let $popup = this.$refs.popup
        $popup.style.left = '0px'
        let $popupRect = $popup.getBoundingClientRect()
        let left = 0
        if ($popupRect.right > window.innerWidth) {
          left = -$popupRect.width + this.$el.offsetWidth
        }
        $popup.style.left = left + 'px'
        this.$emit('open')
      })
    },
    close(e) {
      if (e.path.includes(this.$refs.close) || !e.path.includes(this.$el)) {
        this.isShow = false
      }
      this.$emit('close')
      window.removeEventListener('close')
    },
  },
}
</script>

<style lang="scss" scoped></style>
