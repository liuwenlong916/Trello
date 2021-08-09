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
  props: {
    message: {
      type: String,
      default: '这是默认提示信息',
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      center: true,
      timer: null,
      isShow: false,
      verticalOffset: 20,
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
    show(reset) {
      this.isShow = true
      this.timer = setTimeout(() => {
        this.close(reset)
      }, this.duration)
    },
    close(reset) {
      this.isShow = false
      this.$destroy()
      clearTimeout(this.timer)
      reset && reset(this, this.verticalOffset)
    },
  },
}
</script>
