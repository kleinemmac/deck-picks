import localforage from 'localforage'

const state = {
  decks: [],
  currentDeck: {}
}

const getters = {
  getAllDecks: (state) => { return state.decks },
  getCurrentDeck: (state) => { return state.currentDeck }
}

const actions = {
  async getAllDecks ({ commit }) {
    const decks = []
    localforage.iterate((val, key) => {
      if (key.includes('deck-')) {
        decks.push(val)
      }
    })
    commit('setAllDecks', decks)
    return decks
  },
  async getDeck ({ commit }, id) {
    return localforage.getItem('deck-' + id).then(deck => {
      commit('setDeck', deck)
      return deck
    })
  },
  async makeDeck ({ commit }) {
    const id = Math.random().toString(36).substring(7)
    const key = 'deck-' + id
    localforage.setItem(key, { id, name: '', cards: [] })
    commit('addDeck', { id, name: '', cards: [] })
    return id
  },
  async updateDeck ({ commit }, deck) {
    localforage.setItem('deck-' + deck.id, deck)
    commit('updateDeck', deck)
  },
  async deleteDeck ({ commit, state }, id) {
    localforage.removeItem('deck-' + id)
    const index = state.decks.findIndex(deck => {
      return deck.id === id
    })
    commit('deleteDeck', index)
  }
}

const mutations = {
  setAllDecks (state, decks) {
    state.decks = decks
  },
  setDeck (state, deck) {
    state.currentDeck = deck
  },
  addDeck (state, deck) {
    state.decks.push(deck)
  },
  updateDeck (state, deck) {
    state.currentDeck = deck
  },
  deleteDeck (state, index) {
    state.decks.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
