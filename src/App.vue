<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title>
        <router-link to="/">Deck Picks</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        icon
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer id="footer" fixed></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),

  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style lang="scss" scoped>
  .v-application a {
    text-decoration: none;
    color: #fff;
  }
  #footer {
    height: 32px;
    padding: 0;
    z-index: 10;
  }
</style>
