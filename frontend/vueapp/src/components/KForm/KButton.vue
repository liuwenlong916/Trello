<template>
  <div>
    <input
      type="button"
      class="btn"
      :class="{ 'btn-success': type == 'success' }"
      v-bind="$attrs"
      v-on="$listeners"
    />
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
