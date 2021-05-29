import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const collection = 'files'

export const state = () => ({
  list: null,
})

export const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
}

export const actions = {
  async createFile({state, commit, actions, dispatch}, file) {
    // file: {
    //   name: name,
    //   directory: directory,
    //   path: url,
    // }

    // commit('loadingStart')
    await createDoc(collection, file)
      .then((id) => {
        console.log('id:', id)
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
      .finally(() => {
        // commit('loadingEnd')
      })
  },
}
