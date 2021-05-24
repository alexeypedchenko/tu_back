// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRow9UK6n_aSdMXEgbr1LIqVQayA2BaUc',
  authDomain: 'travel-ukraine-a7d33.firebaseapp.com',
  projectId: 'travel-ukraine-a7d33',
  storageBucket: 'travel-ukraine-a7d33.appspot.com',
  messagingSenderId: '1013893471177',
  appId: '1:1013893471177:web:5d16791c34465d0885e618'
}

// что бы избежать двойной инициализации firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase

