<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'KFormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
