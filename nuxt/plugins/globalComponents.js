import Vue from 'vue'
import CControl from '~/components/form/CControl'

const components = {
  CControl,
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
