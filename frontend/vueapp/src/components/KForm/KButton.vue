<template>
  <div>
    <button :class="['btn', type == 'success' ? 'btn-success' : '']">
      <span v-if="$slots.default"><slot></slot></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'KButton',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
