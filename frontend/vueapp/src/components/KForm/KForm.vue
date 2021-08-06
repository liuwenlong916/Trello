<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KForm',
  props: {
    models: {
      type: Object,
      require: true,
    },
    rules: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped></style>
