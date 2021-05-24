<template>
  <div class="home">
    <h1 class="text-h1 mb-5">
      home
    </h1>

    user: {{ user ? user.email : ''}}

    <br>
    <br>

    <v-btn
      v-if="user"
      @click="logout"
    >
      logout
    </v-btn>
  </div>
</template>

<script>
import firebase from '~/firebase/firebaseApp'

export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    console.log('this.user:', this.user)
  },
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
  },
}
</script>

<style lang="scss">
.home {
  padding: 100px;
}
</style>