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
        icon
        @click="triggerTour = true"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view :triggerTour="triggerTour" @resetTour="triggerTour = false"></router-view>
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
    triggerTour: false
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
