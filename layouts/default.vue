<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="toggleSidebar"
      >
        <v-avatar
          :size="avatarSize"
          v-if="user"
        >
          <img :src="user.photoURL" alt="avatar">
        </v-avatar>
         <v-icon v-else>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <right-menu />
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RightMenu from '~/components/RightMenu'

export default {
  components: {
    RightMenu
  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        { icon: 'bubble_chart', title: 'Exchange', to: '/exchange' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ビットポータル',
      subTitle: 'BitPortal',
      avatarSize: 42
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'user'])
  },
  methods: {
    ...mapActions(['toggleSidebar'])
  },
  watch: {
    sidebar () {
      this.rightDrawer = this.sidebar
    },
    rightDrawer () {
      this.toggleSidebar(this.rightDrawer)
    }
  }
}
</script>
