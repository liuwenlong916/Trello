<template>
  <div class="item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <div style="height:20px">
      <transition name="slide-fade">
        <p v-if="error" style="color:red; ">{{ error }}</p>
      </transition>
    </div>
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
      console.log(this.form.rules, this.prop)
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */
.slide-fade-enter,
.slide-fade-leave-to {
  /* transform: translateX(10); */
  opacity: 0;
  /* max-height: 20px; */
}
</style>
