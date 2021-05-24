export const state = () => ({
  navCollapse: false
})

export const mutations = {
  navToggle(state) {
    state.navCollapse = !state.navCollapse
  },
  navClose(state) {
    state.navCollapse = true
  },
  navOpen(state) {
    state.navCollapse = false
  },
}
