import Vue from 'vue'
import TMessage from './TMessage.vue'

const TMessageClass = Vue.extend(TMessage)

/**
 * 创建TMessage组件对象
 * 管理TMessage组件对象队列
 * @param {*} data
 */
let instances = []
function Message(prop) {
  prop = prop || {}
  if (typeof prop === 'string') {
    prop = {
      message: prop,
    }
  }

  let instance = new TMessageClass({
    propsData: prop,
    methods: {
      onClose() {
        Message.close(this, this.verticalOffset)
      },
    },
  })
  instance.$mount()
  document.body.appendChild(instance.$el)

  // 记录之前每个弹框的高度 + 20 的偏移量
  let verticalOffset = prop.verticalOffset || 20
  instances.forEach(item => {
    //
    verticalOffset += item.$el.offsetHeight + 20
  })
  //top px
  instance.verticalOffset = verticalOffset

  instances.push(instance)
}
Message.close = function(instance, offset) {
  instance.$destroy()
  document.body.removeChild(instance.$el)
  // 元素高度 + 间隔
  let removeHeight = instance.$el.offsetHeight + offset
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

export default Message
