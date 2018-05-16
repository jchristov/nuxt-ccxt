<template>
  <v-list>
    <v-list-tile v-if="!user" @click.native="doSignIn">
      <v-list-tile-action>
      <v-icon light>account_box</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>Google サインイン</v-list-tile-title>
    </v-list-tile>
    <v-list-tile v-else @click.native="doSignOut">
      <v-list-tile-action>
      <v-icon light>account_box</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>ログアウト</v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>

<script>
import auth from '~/plugins/auth'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  async mounted () {
    if (process.browser) {
      let user
      if (!this.user) user = await auth()
      await Promise.all([
        this.user ? Promise.resolve() : this.$store.dispatch('SET_CREDENTIAL', { user: user || null })
      ])
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['signIn', 'signOut', 'toggleSidebar']),
    async doSignIn () {
      await this.signIn()
    },
    async doSignOut () {
      await this.signOut()
      this.toggleSidebar(false)
    }
  }
}
</script>
