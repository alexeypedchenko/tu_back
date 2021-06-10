import {
  getCollection,
  createDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from '~/firebase/firebaseApi'

const collection = 'routes'

export const state = () => ({
  dataLoaded: false,
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
  async getCollection({ commit }) {
    commit('loadingStart')
    await getCollection(collection)
      .then((data) => {
        commit('mutate', {
          property: 'list',
          with: data
        })
        commit('mutate', {
          property: 'dataLoaded',
          with: true
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },

  async createDoc({state, commit, actions, dispatch}, newDoc) {
    commit('loadingStart')
    await createDoc(collection, newDoc)
      .then((id) => {
        // добавим новый элемент в начало массива
        newDoc._id = id
        commit('mutate', {
          property: 'list',
          with: [
            newDoc,
            ...state.list
          ]
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },

  async deleteDoc({state, commit, dispatch}, id) {
    commit('loadingStart')
    await deleteDoc(collection, id)
      .then(() => {
        // отфильтруем список элементов, исключив удаленный id
        commit('mutate', {
          property: 'list',
          with: state.list.filter((el) => el._id !== id)
        })

        // можно не переживать за скорость перебора массива методом 'filter'
        // так как делаем на стороне админки, а не продакшн сайта
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },

  async updateDoc({state, commit, dispatch}, newDoc) {
    commit('loadingStart')
    await updateDoc(collection, newDoc._id, newDoc)
      .then(() => {
        // обновляем данные места локально
        // что бы не делать новый запрос
        // для получения обновленных данных
        const index = state.list.findIndex((doc) => doc._id === newDoc._id)
        state.list[index] = newDoc

        commit('mutate', {
          property: 'list',
          with: state.list
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  }

}
