<template>
  <transition name="message-fade">
    <div
      :class="['message', `message-${type}`, center ? 'is-center' : '']"
      :style="positionStyle"
      v-if="isShow"
    >
      <p class="message-content">提示信息：{{ message }}</p>
      <i class="icon icon-close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TMessage',
  mounted() {
    this.timer = setTimeout(() => {
      if (this.isShow) {
        this.close()
      }
    }, this.duration)
  },
  data() {
    return {
      message: '这是默认提示信息',
      type: 'info',
      center: true,
      verticalOffset: 20,
      // offset: 20,
      isShow: true,
      timer: null,
      duration: 1000,
      onClose: null,
    }
  },
  computed: {
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      }
    },
  },
  methods: {
    close() {
      this.isShow = false
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    },
  },
}
</script>
