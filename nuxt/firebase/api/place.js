import firebase from '~/firebase/firebaseApp'

const db = firebase.firestore()
const placesCollection = db.collection('places')

export const getPlaces = async () => {
  return new Promise((res, rej) => {
    placesCollection
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) res([]) // возвращаем пустой массив
        const places = []
        querySnapshot.forEach((doc) => {
          if (!doc.exists) return []
          const place = doc.data()
          place._id = doc.id
          places.push(place)
          res(places)
        })
      })
      .catch((err) => rej(err))
  })
}

export const createPlace = async (place) => {
  return new Promise((res, rej) => {
    placesCollection.add(place)
      .then((docRef) => res(docRef.id))
      .catch((err) => rej(err))
  })
}

export const getPlace = async (id) => {
  const place = await placesCollection.doc(id).get()
  return place.exists ? place.data() : null
}

export const updatePlace = async (id, place) => {
  return new Promise((res, rej) => {
    placesCollection
      .doc(id)
      .update(place)
      .then(() => res())
      .catch((err) => rej(err))
  })
}

export const deletePlace = async (id) => {
  return new Promise((res, rej) => {
    placesCollection.doc(id).delete()
      .then(() => res())
      .catch((err) => rej(err))
  })
}