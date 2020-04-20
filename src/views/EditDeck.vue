<template>
  <v-container fluid class="pa-0 full-height">
    <v-row class="mx-0 full-height">
      <v-col v-if="loadingDeck">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
      <template v-else>
        <v-col cols="3" class="pa-0">
          <v-navigation-drawer floating width="100%">
            <v-container class="pb-0">
              <v-row>
                <v-col>
                  <p class="display-1">
                    Filters
                    <v-btn
                      class="float-right mt-2"
                      small
                      outlined
                      @click="clearSearch()"
                    >Reset</v-btn>
                  </p>
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedLegalities"
                        :items="legalityItems"
                        label="Legality"
                        multiple
                        outlined
                        dense
                        hide-details
                        @change="searchCards()"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="filters.convertedManaCost"
                        label="Mana Cost"
                        outlined
                        dense
                        hide-details
                        v-debounce:1000ms="searchCards"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedColors"
                        :items="colorItems"
                        label="Color"
                        multiple
                        outlined
                        dense
                        hide-details
                        @change="searchCards()"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedRarities"
                        :items="rarityItems"
                        label="Rarity"
                        multiple
                        outlined
                        dense
                        hide-details
                        @change="searchCards()"
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="display-1">
                    Search
                  </p>
                  <v-text-field
                    v-model="searchValue"
                    placeholder="Start typing card name..."
                    append-icon="mdi-magnify"
                    v-debounce:1000ms="searchCards"
                    autocomplete="off"
                    color="success"
                    :loading="searching"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="noResults" class="card-results">
              <p>No results found</p>
            </v-container>
            <v-container class="py-0">
              <v-row>
                <v-col>
                  <v-btn :disabled="filters.selectedPage === 1" @click="getPreviousPage()" text>
                    <v-icon>mdi-chevron-left</v-icon>
                    Prev
                  </v-btn>
                </v-col>
                <v-col class="text-right">
                  <v-btn :disabled="searchedCards.length < 100" @click="getNextPage()" text>
                    Next
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container class="card-results">
              <v-row
                v-for="card in searchedCards"
                :key="card.id"
                @click="getCard(card)"
                class="cursor-pointer"
              >
                <v-col>{{ card.name }}</v-col>
              </v-row>
            </v-container>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="6">
          <template v-if="selectedCard">
            <div class="mx-auto img-container">
              <v-img
                v-if="selectedCard.imageUrl"
                :src="selectedCard.imageUrl"
                max-width="265px"
                class="mx-auto"
              >
                <template v-slot:placeholder>
                  <img src="../assets/mtgback.jpg" alt="placeholder image">
                </template>
              </v-img>
              <v-img
                v-if="!selectedCard.imageUrl"
                src="../assets/mtgback.jpg"
                max-width="265px"
                class="mx-auto"
              >
              </v-img>
              <v-btn id="add-card" class="mx-2" fab dark color="purple" @click="addCardToDeck()">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-row>
              <v-col>
                <v-card class="pa-3">
                  <p class="display-1 text-center">{{ selectedCard.name }}</p>
                  <div class="body-1">
                    <p class="capitalize">Layout: {{ selectedCard.layout }}</p>
                    <p>Color(s): {{ selectedCard.colors.join(', ') }}</p>
                    <p>Converted Mana Cost: {{ selectedCard.cmc }}</p>
                    <p>Type: {{ selectedCard.type }}</p>
                    <p>Rarity: {{ selectedCard.rarity }}</p>
                    <p>Set: {{ selectedCard.setName }}</p>
                    <p>Text: <span v-html="selectedCard.text"></span></p>
                    <p>Flavor Text: <span v-html="selectedCard.flavor"></span></p>
                    <p>Power: {{ selectedCard.power }}</p>
                    <p>Toughness: {{ selectedCard.toughness }}</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-navigation-drawer floating width="100%">
            <v-container>
              <v-row>
                <v-col v-if="!editingName" class="text-center">
                  <p class="display-1">
                    {{ deck.name.length > 0 ? deck.name : 'Deck Name'  }}
                    <v-btn @click="editingName = true" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </p>
                </v-col>
                <v-col v-else class="text-center">
                  <v-text-field
                    v-model="deck.name"
                    label="Deck Name"
                    append-icon="mdi-content-save"
                    @click:append="editingName = false; updateDeck()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container id="deck-listing">
              <v-row
                v-for="(card, index) in deck.cards"
                :key="card.id"
                align="center"
              >
                <v-col cols="2" @click="getCard(card)" class="cursor-pointer">
                  <img :src="card.imageUrl" width="50">
                </v-col>
                <v-col cols="8" @click="getCard(card)" class="cursor-pointer">{{ card.name }}</v-col>
                <v-col cols="2">
                  <v-btn icon @click="removeCardFromDeck(index)"><v-icon>mdi-close</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-navigation-drawer>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditDeck',

  components: {
  },

  data: () => ({
    deck: null,
    loadingDeck: true,
    editingName: false,
    searchValue: '',
    searching: false,
    noResults: false,
    filters: {
      selectedLegalities: [],
      convertedManaCost: [],
      selectedColors: [],
      selectedRarities: [],
      selectedPage: 1
    },
    searchedCards: [],
    legalityItems: [
      'Legal',
      'Banned',
      'Restricted'
    ],
    colorItems: [
      'White',
      'Blue',
      'Black',
      'Red',
      'Green',
      'Colorless'
    ],
    rarityItems: [
      'Common',
      'Uncommon',
      'Rare',
      'Mythic Rare',
      'Special',
      'Basic Land'
    ],
    selectedCard: null
  }),

  methods: {
    updateDeck () {
      this.$store.dispatch('decks/updateDeck', this.deck)
    },
    searchCards () {
      this.searching = true
      const searchConfig = {
        searchValue: this.searchValue,
        filters: this.filters
      }
      this.$store.dispatch('cards/searchCards', searchConfig)
        .then(cards => {
          this.searchedCards = cards
          this.searching = false
          this.searchedCards.length === 0 ? this.noResults = true : this.noResults = false
        })
    },
    getNextPage () {
      this.filters.selectedPage++
      this.searchCards()
    },
    getPreviousPage () {
      this.filters.selectedPage--
      this.searchCards()
    },
    clearSearch () {
      this.searchValue = null
      this.filters = {
        selectedLegalities: [],
        convertedManaCost: [],
        selectedColors: [],
        selectedRarities: []
      }
      this.searchedCards = []
    },
    getCard (card) {
      this.selectedCard = card
    },
    addCardToDeck () {
      this.deck.cards.push(this.selectedCard)
      this.updateDeck()
    },
    removeCardFromDeck (index) {
      this.deck.cards.splice(index, 1)
      this.updateDeck()
    }
  },

  computed: {
  },

  mounted: function () {
    this.$store.dispatch('decks/getDeck', this.$route.params.id).then(deck => {
      this.deck = deck
      this.loadingDeck = false
    })
  }
}
</script>

<style lang="scss" scoped>
  .full-height {
    height: 100%;
  }
  .card-results {
    max-height: calc(100vh - 500px);
    overflow-y: auto;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .img-container {
    width: 256px;
    min-height: 411px;
  }
  .cursor-pointer {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
  #add-card {
    position: relative;
    top: -35px;
    left: -15px;
  }
  #deck-listing {
    max-height: calc(100vh - 170px);
    overflow-y: auto;
  }
</style>
