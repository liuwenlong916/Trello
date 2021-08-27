<template>
  <div>
    <form v-on="$listeners">
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KForm',
  componentName: 'KForm',
  created() {
    this.$on('el.form.addItem', item => {
      item && this.items.push(item)
    })
    this.$on('el.form.removeItem', item => {
      item.prop && this.items.splice(this.items.indexOf(item), 1)
    })
  },
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
  data() {
    return {
      items: [],
    }
  },
  methods: {
    validator(cb) {
      // const tasks = this.$children
      //   .filter(item => item.prop)
      //   .map(item => item.validate())
      //elementui 源码实现children解耦
      const tasks = this.items.map(item => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    },
  },
}
</script>

<style lang="scss" scoped></style>
