<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="display-3 py-5">Your Decks</p>
        <v-card
          max-width="250"
        >
          <v-card-text class="text-center">
            <p class="display-1">
              Create<br>New<br>Deck
            </p>
            <v-btn
              href="https://github.com/vuetifyjs/vuetify/releases/latest"
              target="_blank"
              icon
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="faqVisible" right absolute floating width="25%">
      <v-container>
        <v-row>
          <v-col class="text-center">
            <div class="text-right">
              <v-btn icon @click="faqVisible = false; faqButtonVisible = true">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <p class="display-1 pb-5">FAQs</p>
            <div class="headline">
              <p>What are the rules for various deck formats?</p>
              <p>What are the differences between colors?</p>
              <p>What is a Mana Curve?</p>
              <p>Why are some cards banned or restricted?</p>
              <p>What is a sideboard?</p>
              <p>What are some helpful resources for a beginner MTG player?</p>
              <p>How much do cards cost?</p>
              <p>Will I ever experience a love that is not temporary?</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <v-btn v-if="faqButtonVisible" @click="faqVisible = true" id="faqs-button" fab dark large color="purple">
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',

  components: {
  },

  data: () => ({
    faqVisible: true,
    faqButtonVisible: false
  }),

  mounted: function () {
    this.$store.dispatch('decks/makeDeck')
    this.$store.dispatch('decks/makeDeck')
    this.$store.dispatch('decks/getAllDecks')
  }
}
</script>

<style lang="scss" scoped>
  #faqs-button {
    position: fixed;
    right: -32px;
    top: calc(50% - 32px);
    i {
      right: 15px;
    }
  }
</style>
