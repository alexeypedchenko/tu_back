<template>
  <v-navigation-drawer
    app
    :mini-variant="$store.state.navCollapse"
    permanent
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>
          {{ user ? user.displayName || user.email : 'Hello user!' }}
        </v-list-item-title>

        <v-btn icon @click.stop="$store.commit('navClose')">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'mdi-home-city',
          link: '/'
        },
        {
          title: 'My Account',
          icon: 'mdi-account',
          link: '/profile'
        },
      ],
      mini: false,
    }
  },
}
</script>

<style>
</style>