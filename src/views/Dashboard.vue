<template>
  <v-container fluid>
    <v-row v-if="loadingDecks" justify="center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col>
        <p class="display-3 py-5">Your Decks</p>
        <v-row>
          <v-col class="flex-initial">
            <v-card
              @click="createNewDeck()"
              id="new-deck-card"
            >
              <v-card-text class="text-center">
                <p class="display-1">
                  Create<br>New<br>Deck
                </p>
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            class="flex-initial"
            v-for="deck in decks"
            :key="deck.id"
          >
            <v-card class="d-inline-block mx-auto">
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="auto">
                    <v-img
                      height="200"
                      width="200"
                      :src="deck.cards[0].imageUrl"
                      v-if="deck.cards.length > 0"
                    ></v-img>
                  </v-col>
                  <v-col
                    cols="auto"
                    class="text-center pl-0"
                  >
                    <v-row
                      class="flex-column ma-0 fill-height"
                      justify="center"
                    >
                      <v-col class="px-0">
                        <v-btn icon @click="editDeck(deck.id)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col class="px-0">
                        <v-btn icon @click="deleteDeck(deck.id)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>{{ deck.name }}</v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
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
    faqButtonVisible: false,
    decks: [],
    loadingDecks: true
  }),

  methods: {
    getAllDecks () {
      this.$store.dispatch('decks/getAllDecks').then((decks) => {
        this.decks = decks
        this.loadingDecks = false
      })
    },
    createNewDeck () {
      this.$store.dispatch('decks/makeDeck').then(id => {
        this.$router.push({ name: 'edit-deck', params: { id } })
      })
    },
    editDeck (id) {
      this.$router.push({ name: 'edit-deck', params: { id } })
    },
    deleteDeck (id) {
      this.$store.dispatch('decks/deleteDeck', id).then(() => {
        this.getAllDecks()
      })
    }
  },

  mounted: function () {
    this.getAllDecks()
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
  .flex-initial {
    flex: initial;
    width: 300px;
  }
  #new-deck-card {
    min-height: 320px;
  }
</style>
