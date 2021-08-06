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
  provide() {
    return {
      form: this,
    }
  },
  props: {
    model: {
      type: Object,
      require: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validator(cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    },
  },
}
</script>

<style lang="scss" scoped></style>
