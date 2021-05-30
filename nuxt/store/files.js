import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const collection = 'files'

export const state = () => ({
  dataLoaded: false,
  loading: false,
  list: null,
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

  async createFile({state, commit, actions, dispatch}, file) {
    // file: {
    //   name: name,
    //   directory: directory,
    //   path: url,
    // }

    commit('loadingStart')
    await createDoc(collection, file)
      .then((id) => {
        // добавим новый элемент в начало массива
        file._id = id
        commit('mutate', {
          property: 'list',
          with: [
            file,
            ...state.list
          ]
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },
}
