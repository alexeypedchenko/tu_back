import firebase from '~/firebase/firebaseApp'

const db = firebase.firestore()

// places Api
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


// files
const storage = firebase.storage() // получить инстанс storage

export const uploadFile = async (file, directory = 'images') => {
  let url = ''
  const {name} = file
  const fileRef = storage.ref(`${directory}/${name}`) // создать путь к файлу
  try {
    await fileRef.put(file).then(async (snapshot) => {
      url = await snapshot.ref.getDownloadURL()
    })
    return url
  } catch(error) {
    console.log('put file error:', error)
  }
}

export const getFile = async (name, directory = 'images') => {
  const fileRef = storage.ref(`${directory}/${name}`)
  try {
    return await fileRef.getDownloadURL()
  } catch(error) {
    console.log('getDownloadURL error:', error)
  }
}

export const deleteFile = async (name, directory = 'images') => {
  const fileRef = storage.ref(`${directory}/${name}`)
  return await fileRef.delete()
    .then(() => {
      console.log('File deleted successfully')
    })
    .catch((error) => {
      console.error('Uh-oh, an error occurred!')
    })
}

export const setFile = async (file, directory) => {
  const {name} = file
  // get file from db or upload to db and get
  return await getFile(name, directory) || await uploadFile(file, directory)
}
