import firebase from '~/firebase/firebaseApp'

const storage = firebase.storage() // получить инстанс storage

export const uploadFile = (file, name, directory = 'images') => {
  if (!name) {
    name = file.name
  }
  const fileRef = storage.ref(`${directory}/${name}`) // создать путь к файлу
  return new Promise ((res, rej) => {
    fileRef.put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL()
      })
      .then((url) => res(url))
      .catch((error) => {
        console.log('put file error:', error)
        rej(error)
      })
  })
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
