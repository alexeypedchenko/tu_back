import {
  getPlaces,
  createPlace,
  deletePlace,
} from '~/firebase/firebaseApi'

export const state = () => ({
  loading: false,
  list: [],
})

export const mutations = {
  loadingStart(state) {
    state.loading = true
  },
  loadingEnd(state) {
    state.loading = false
  },
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
}

export const actions = {
  async getPlaces({ commit }) {
    commit('loadingStart')
    await getPlaces()
      .then((data) => {
        commit('mutate', {
          property: 'list',
          with: data
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },

  async createPlace({state, commit, actions, dispatch}, newPlace) {
    commit('loadingStart')
    await createPlace(newPlace)
      .then((id) => {
        // добавим новый элемент в начало массива
        newPlace._id = id
        commit('mutate', {
          property: 'list',
          with: [
            newPlace,
            ...state.list
          ]
        })
        // перейдем на страницу мест
        this.$router.push('/places')
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },

  async deletePlace({state, commit, dispatch}, id) {
    commit('loadingStart')
    await deletePlace(id)
      .then(() => {
        // отфильтруем список элементов, исключив удаленный id
        // можно не переживать за скорость перебора массива методом 'filter'
        // так как делаем на стороне админки, а не продакшн сайта
        commit('mutate', {
          property: 'list',
          with: state.list.filter((el) => el._id !== id)
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  }


}
