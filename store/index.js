import firebase from '~/plugins/firebase'

// import { firebaseMutations, firebaseAction } from 'vuexfire'
// const db = firebase.database()
// const usersRef = db.ref('/users')
// const postsRef = db.ref('/posts')
const provider = new firebase.auth.GoogleAuthProvider()

export const strict = false

export const state = () => ({
  sidebar: false,
  user: null,
  users: []
})

export const getters = {
  sidebar: state => state.sidebar,
  users: state => state.users,
  user: state => state.user
}

export const mutations = {
  toggleSidebar (state, payload) {
    if (payload === undefined) {
      state.sidebar = !state.sidebar
    } else {
      state.sidebar = payload
    }
  },
  setCredential (state, { user }) {
    state.user = user
  // },
  // savePost (state, { post }) {
  //   state.post = post
  }
}

export const actions = {
  toggleSidebar ({commit}, payload) {
    commit('toggleSidebar', payload)
  },
  async SET_CREDENTIAL ({commit}, { user }) {
    if (!user) return
    // await usersRef.child(user.email.replace('@', '_at_').replace(/\./g, '_dot_')).set({
    //   name: user.displayName,
    //   email: user.email,
    //   icon: user.photoURL
    // })
    commit('setCredential', { user })
  },
  // async INIT_SINGLE ({commit}, { id }) {
  //   const snapshot = await postsRef.child(id).once('value')
  //   commit('savePost', { post: snapshot.val() })
  // },
  // INIT_USERS: firebaseAction(({ bindFirebaseRef }) => {
  //   bindFirebaseRef('users', usersRef)
  // }),
  // INIT_POSTS: firebaseAction(({ bindFirebaseRef }) => {
  //   bindFirebaseRef('posts', postsRef)
  // }),
  // ADD_POST: firebaseAction((ctx, { email, body }) => {
  //   postsRef.push({
  //     from: email,
  //     body
  //   })
  // }),
  signIn () {
    firebase.auth().signInWithRedirect(provider)
  },
  async signOut ({commit}) {
    await firebase.auth().signOut()
    commit('setCredential', {user: null})
  }
}
