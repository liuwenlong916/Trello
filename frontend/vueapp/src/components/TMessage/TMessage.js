import Vue from 'vue'
import TMessage from './TMessage.vue'

/**
 * 创建TMessage组件对象
 * 管理TMessage组件对象队列
 * @param {*} data
 */
let instances = []
export function Message(props) {
  props = props || {}
  if (typeof props === 'string') {
    props = {
      message: props,
    }
  }

  //extend方式
  const TMessageClass = Vue.extend(TMessage)
  let instance = new TMessageClass({
    propsData: props,
  }).$mount()

  //new Vue方式
  /**
  const vm = new Vue({
    render(h) {
      return h(TMessage, { props })
    },
  }).$mount()
  let instance = vm.$children[0]
  */

  document.body.appendChild(instance.$el)
  instance.show(Message.reset)

  // 记录之前每个弹框的高度 + 20 的偏移量
  let verticalOffset = props.verticalOffset || 20
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 20
  })
  //top px
  instance.verticalOffset = verticalOffset

  instances.push(instance)
}
Message.reset = function(instance, verticalOffset) {
  instance.$destroy()
  document.body.removeChild(instance.$el)
  // 元素高度 + 间隔
  let removeHeight = instance.$el.offsetHeight + verticalOffset
  let index = instances.findIndex(item => item === instance)
  instances = instances.filter(item => item !== instance)

  //从消失的弹框开始重新计算 剩下的top
  for (let i = index; i < instances.length; i++) {
    let item = instances[i]
    item.verticalOffset -= removeHeight
  }
}
//使用： Message.error('错误信息')
let types = ['success', 'warning', 'info', 'error']
types.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
      }
    }
    return Message({
      ...options,
      type,
    })
  }
})

export default {
  install(Vue) {
    Vue.prototype.$message = Message
  },
}
