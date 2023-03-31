import { createApp, type Component, type DirectiveBinding } from 'vue'
import { addClass, removeClass } from '../utils/dom'

const relativeCls = 'g-relative'

export default (Comp: Component) => {
  function append(el: HTMLElement) {
    const name = Comp.name
    const style = getComputedStyle(el)
    if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el: HTMLElement) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
  
  return {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      if (binding.value) {
        append(el)
      }
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    },
  }
}