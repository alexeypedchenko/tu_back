const functions = require("firebase-functions")
const firebase = require('firebase')
const { db, admin } = require('./util/admin')
const config = require('./util/config')

firebase.initializeApp(config)


// *** users ***
const users = db.collection('users')

const userData = {
  favoritePlaces: [],
  favoriteRoutes: [],
  createdRoutes: [],
  role: 'user',
  credentials: {
    userPanel: true,
    adminPanel: false,
  },
}

exports.createUserData = functions.region('europe-west2').auth.user().onCreate((user) => {
  users.doc(user.uid).get().then((doc) => {
    if (!doc.exists) {
      users.doc(user.uid).set(userData)
    }
  })
})

exports.deleteUserData = functions.region('europe-west2').auth.user().onDelete((user) => {
  users.doc(user.uid).delete()
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true})
//   response.send("Hello from Firebase!")
// })
