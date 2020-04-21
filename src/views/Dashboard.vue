<template>
  <v-container fluid>
    <v-tour name="dashboardTour" :steps="tourSteps"></v-tour>
    <v-dialog
      v-model="confirmDelete"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete Deck?</v-card-title>
        <v-card-text>
          Are you sure you want to delete this deck? Once deleted, it cannot be recovered.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="confirmDelete = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteDeck()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            v-for="(deck, index) in decks"
            :key="deck.id"
          >
            <v-card class="d-inline-block mx-auto">
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="auto">
                    <v-img
                      height="200"
                      width="200"
                      :src="require(`../assets/${deck.color}.svg`)"
                      v-if="deck.color"
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
                        <v-btn :id="'edit-button-' + index" icon @click="editDeck(deck.id)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col class="px-0">
                        <v-btn :id="'delete-button-' + index" icon @click="startDeleteDeck(deck.id)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col class="px-0">
                        <v-btn :id="'export-button-' + index" icon @click="exportDeck(deck)">
                          <v-icon>mdi-application-export</v-icon>
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
              <p><a href="https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/formats" target="_blank">What are the rules for various deck formats?</a></p>
              <p><a href="https://mtg.gamepedia.com/Color" target="_blank">What are the differences between colors?</a></p>
              <p><a href="https://themagiccenter.com/learn-magic/mana-curve/" target="_blank">What is a Mana Curve?</a></p>
              <p><a href="https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted" target="_blank">Why are some cards banned or restricted?</a></p>
              <p><a href="https://www.thegamer.com/magic-the-gathering-pro-tips-beginner/" target="_blank">What are some helpful resources for a beginner MTG player?</a></p>
              <p><a href="https://www.mtgprice.com/magic-the-gathering-prices.jsp" target="_blank">How much do cards cost?</a></p>
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
import download from 'downloadjs'

export default {
  name: 'Dashboard',

  props: ['triggerTour'],

  components: {
  },

  data: () => ({
    faqVisible: true,
    faqButtonVisible: false,
    decks: [],
    loadingDecks: true,
    confirmDelete: false,
    toDelete: null,
    tourSteps: [
      {
        target: '#new-deck-card',
        header: {
          title: 'Create a New Deck'
        },
        content: 'Click here to create a new deck.'
      },
      {
        target: '#edit-button-0',
        header: {
          title: 'Edit Existing Deck'
        },
        content: 'Click here to edit a deck you already made.'
      },
      {
        target: '#delete-button-0',
        header: {
          title: 'Delete Deck'
        },
        content: 'Click here to delete a deck.'
      },
      {
        target: '#export-button-0',
        header: {
          title: 'Export Deck'
        },
        content: 'Click here to export a deck.'
      }
    ]
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
    startDeleteDeck (id) {
      this.toDelete = id
      this.confirmDelete = true
    },
    deleteDeck () {
      this.$store.dispatch('decks/deleteDeck', this.toDelete).then(() => {
        this.getAllDecks()
        this.confirmDelete = false
      })
    },
    exportDeck (deck) {
      download(JSON.stringify(deck), deck.name, 'application/json')
    }
  },

  watch: {
    triggerTour: function (newVal) {
      if (newVal) {
        this.$tours.dashboardTour.start()
        this.$emit('resetTour')
      }
    }
  },

  mounted: function () {
    this.getAllDecks()
  }
}
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: white !important;
  }
  .flex-initial {
    flex: initial;
    width: 300px;
  }
  #faqs-button {
    position: fixed;
    right: -32px;
    top: calc(50% - 32px);
    i {
      right: 15px;
    }
  }
  #new-deck-card {
    min-height: 320px;
  }
</style>
