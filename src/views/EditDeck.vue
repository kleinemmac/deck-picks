<template>
  <v-container fluid>
    <v-row>
      <v-col v-if="loadingDeck">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
      <template v-else>
        <v-col>
          <v-navigation-drawer absolute floating width="25%">
            <v-container>
              <v-row>
                <v-col>
                  <p class="display-1">
                    Filters
                  </p>
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedLegality"
                        :items="legalityItems"
                        label="Legality"
                        multiple
                        outlined
                        dense
                        hide-details
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="filters.convertedManaCost"
                        label="Mana Cost"
                        outlined
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedColor"
                        :items="colorItems"
                        label="Color"
                        multiple
                        outlined
                        dense
                        hide-details
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-combobox
                        v-model="filters.selectedRarity"
                        :items="rarityItems"
                        label="Rarity"
                        multiple
                        outlined
                        dense
                        hide-details
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
                    placeholder="Start typing card name..."
                    append-icon="mdi-magnify"
                    v-debounce:1000ms="searchCards"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-navigation-drawer>
        </v-col>
        <v-col>
          <v-navigation-drawer right absolute floating width="25%">
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
    filters: {
      selectedLegality: null,
      convertedManaCost: null,
      selectedColor: null,
      selectedRarity: null
    },
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
    ]
  }),

  methods: {
    updateDeck () {
      this.$store.dispatch('decks/updateDeck', this.deck)
    },
    searchCards () {
      console.log('searched cards')
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
</style>
