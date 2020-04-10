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
            <v-container>
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
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                v-for="card in searchedCards"
                :key="card.id"
                @click="getCard(card)"
              >
                <v-col>{{ card.name }}</v-col>
              </v-row>
            </v-container>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="6">
          <template v-if="selectedCard">
            <v-img
              :src="selectedCard.imageUrl"
              max-width="265px"
              class="mx-auto"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
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
    searchValue: null,
    filters: {
      selectedLegalities: [],
      convertedManaCost: [],
      selectedColors: [],
      selectedRarities: []
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
      const searchConfig = {
        searchValue: this.searchValue,
        filters: this.filters
      }
      this.$store.dispatch('cards/searchCards', searchConfig).then(cards => {
        this.searchedCards = cards
      })
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
</style>
