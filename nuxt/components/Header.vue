<template>
  <v-app-bar
    app
    flat
    color="white"
    class="header"
  >
    <v-app-bar-nav-icon @click="$store.commit('navToggle')">
    </v-app-bar-nav-icon>

    <v-toolbar-title>
      TU Admin Panel
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="user"
      @click="logout"
    >
      logout
      <v-icon right>
        mdi-logout
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import firebase from '~/firebase/firebaseApp'

export default {
  methods: {
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/fireAuthAction')
          this.$router.push('/login')
        }).catch((error) => {
            console.log('logout error:', error)
        })
    },
  }
}
</script>

<style lang="scss">
.header.v-app-bar {
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.12) !important;
}
</style>