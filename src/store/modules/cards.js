import axios from 'axios'

const state = {
  cards: []
}

const getters = {
  getCards: (state) => { return state.cards }
}

const actions = {
  async searchCards ({ commit }, searchConfig) {
    return axios.get('https://api.magicthegathering.io/v1/cards', {
      params: {
        name: searchConfig.searchValue,
        legality: searchConfig.filters.selectedLegalities.join(),
        cmc: searchConfig.filters.convertedManaCost,
        colors: searchConfig.filters.selectedColors.join(),
        rarity: searchConfig.filters.selectedRarities.join()
      }
    }).then(response => {
      commit('setCards', response.data.cards)
      return response.data.cards
    })
  }
}

const mutations = {
  setCards (state, cards) {
    state.cards = cards
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
