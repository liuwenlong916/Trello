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
  props: {
    message: {
      type: String,
      default: '这是默认提示信息',
    },
    type: {
      type: String,
      default: 'info',
    },
    verticalOffset: {
      type: Number,
      default: 20,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      center: true,
      timer: null,
      duration: 1000,
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
      this.onClose && this.onClose()
      // if (typeof this.onClose === 'function') {
      //   this.onClose()
      // }
    },
  },
}
</script>
