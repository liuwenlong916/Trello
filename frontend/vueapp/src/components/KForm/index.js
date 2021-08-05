import KInput from './KInput'
import KButton from './KButton'

export { KButton, KInput }

//TODO如何全局引用
const KForm = {
  install: function(Vue) {
    Vue.component(KInput.name, KInput)
    Vue.component(KButton.name, KButton)
  },
}
export default KForm
