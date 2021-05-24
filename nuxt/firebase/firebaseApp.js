// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-GLmNT05ULDkRXB0OmnN3CoF201r3oBk',
  authDomain: 'travel-ukraine-a7120.firebaseapp.com',
  projectId: 'travel-ukraine-a7120',
  storageBucket: 'travel-ukraine-a7120.appspot.com',
  messagingSenderId: '533561204645',
  appId: '1:533561204645:web:c22c030a5061fc7bee924c',
  measurementId: 'G-R6NGFQWGQX'
}

// что бы избежать двойной инициализации firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase