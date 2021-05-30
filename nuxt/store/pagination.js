export const state = () => ({
  onPage: 5,
  onPageList: [
    5,
    10,
    15,
    25,
    50,
  ]
})

export const mutations = {
  setOnPage(state, value) {
    state.onPage = value
  }
}
