<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'KFormItem',
  inject: ['form'],
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      const schema = new Schema({ [this.prop]: rules })
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
