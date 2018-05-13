import * as firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyBWRe-5uzqStVawMBTWnjlYXO0Ao6ZS-YQ',
      authDomain: 'nuxt-ccxt.firebaseapp.com',
      databaseURL: 'https://nuxt-ccxt.firebaseio.com',
      projectId: 'nuxt-ccxt',
      storageBucket: 'nuxt-ccxt.appspot.com',
      messagingSenderId: '995588772025'
    }
  )
}

export default firebase
