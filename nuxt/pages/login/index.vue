<template>
  <div class="login">
    <v-form
      class="login__form"
      @submit.prevent="auth"
      v-model="valid"
    >
      <h2 class="text-h3 mb-5 text-center">
        login
      </h2>

      <v-text-field
        class="mb-5"
        v-model="fields.email"
        :rules="rules.emailRules"
        label="E-mail"
        required
      />

      <v-text-field
        v-model="fields.password"
        class="mb-5"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.emptyRules"
        label="Password"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        required
      />

      <v-btn
        type="submit"
        :disabled="!valid"
        color="success"
        :loading="loading"
      >
        login
      </v-btn>

      <p
        v-if="error"
        class="text-body-2 mt-5 red--text"
      >
        {{ error }}
      </p>

    </v-form>
  </div>
</template>

<script>
import {setUser} from '~/plugins/setUser'
import {userSignIn} from '~/firebase/userApi'

export default {
  data() {
    return {
      fields: {
        email: 'user@mail.com',
        password: '123456',
      },
      rules: {
        emptyRules: [
          v => !!v || 'Should not be empty',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      },
      error: null,
      passwordShow: false,
      valid: false,
      loading: false,
    }
  },
  mounted() {
    this.checkAuthUser()
  },
  methods: {
    async auth() {
      this.loading = true
      const {email, password} = this.fields
      await userSignIn(email, password)
        .then((authUser) => {
          setUser(this.$store, authUser)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log('err:', err)
          this.error = err.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    checkAuthUser() {
      if (!!this.$store.state.auth.user) {
        this.$router.push('/')
      }
    },
  },
  layout: 'empty'
}
</script>

<style lang="scss">
.login {
  padding-top: 10vh;
}
.login__form {
  width: 400px;
  margin: 0 auto;
  max-width: 100%;
}
</style>
