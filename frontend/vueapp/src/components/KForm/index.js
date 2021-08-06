import KInput from './KInput'
import KButton from './KButton'
import KFormItem from './KFormItem'
import KForm from './KForm'

export { KButton, KInput, KFormItem }

//TODO如何全局引用
const k = {
  install(Vue) {
    Vue.component(KInput.name, KInput)
    Vue.component(KButton.name, KButton)
    Vue.component(KFormItem.name, KFormItem)
    Vue.component(KForm.name, KForm)
  },
}
export default k
