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
    const items = { ...localStorage }
    const decks = Object.keys(items)
      .filter(key => key.includes('deck-'))
      .reduce((obj, key) => {
        obj[key] = items[key]
        return obj
      }, {})
    const deckObjects = []
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(decks)) {
      deckObjects.push(value)
    }
    commit('setAllDecks', deckObjects)
  },
  async getDeck ({ commit }, id) {
    const deck = localStorage.getItem('deck-' + id)
    if (deck) {
      commit('setDeck', JSON.parse(deck))
    }
    return JSON.parse(deck)
  },
  async makeDeck ({ commit }) {
    const id = Math.random().toString(36).substring(7)
    const key = 'deck-' + id
    localStorage.setItem(key, JSON.stringify({ id, name: '' }))
    commit('addDeck', { id, name: '' })
    return id
  },
  async updateDeck ({ commit }, deck) {
    localStorage.setItem('deck-' + deck.id, JSON.stringify(deck))
    commit('updateDeck', deck)
  },
  async deleteDeck ({ commit }, id) {
    localStorage.removeItem(id)
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
  deleteDeck (state, deck) {
    //
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
