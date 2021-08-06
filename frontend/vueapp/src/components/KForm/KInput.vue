<template>
  <div>
    <!--$attr 所有未定义在props里的属性， v-bind 向下传递-->
    <input :value="value" @input="onInput" v-bind="$attrs" class="form-field" />
  </div>
</template>

<script>
export default {
  name: 'KInput',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    },
  },
}
</script>

<style lang="scss" scoped></style>
