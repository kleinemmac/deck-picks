<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-navigation-drawer absolute floating width="25%">
          <v-container>
            <v-row>
              <v-col>
                <p class="display-1">
                  Filters
                </p>
                <v-combobox v-model="selectedLegality" :items="legalityItems" label="Legality" multiple outlined dense>
                </v-combobox>
                <v-input>
                  Converted Mana Cost
                </v-input>
                <v-combobox v-model="selectedColor" :items="colorItems" label="Color" multiple outlined dense>
                </v-combobox>
                <v-combobox v-model="selectedRarity" :items="rarityItems" label="Rarity" multiple outlined dense>
                </v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p class="display-1">
                  Search
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-navigation-drawer>
      </v-col>
      <v-col>
        <v-navigation-drawer right absolute floating width="25%">
          <v-container>
            <v-row>
              <v-col class="text-center">
                <p class="display-1">
                  Deck Name
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditDeck',

  components: {
  },

  data: () => ({
    selectedLegality: null,
    selectedColor: null,
    selectedRarity: null,
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

  mounted: function () {
  }
}
</script>

<style lang="scss" scoped>
</style>
