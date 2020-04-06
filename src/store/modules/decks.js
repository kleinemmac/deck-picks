const state = {
  decks: []
}

const getters = {
  getAllDecks: (state) => { return state.decks }
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
  async makeDeck ({ commit }) {
    const id = 'deck-' + Math.random().toString(36).substring(7)
    localStorage.setItem(id, JSON.stringify({ id }))
    commit('addDeck', { id })
  },
  async updateDeck ({ commit }, deck) {
    localStorage.setItem(deck.id, JSON.stringify(deck))
  },
  async deleteDeck ({ commit }, id) {
    localStorage.removeItem(id)
  }
}

const mutations = {
  setAllDecks (state, decks) {
    state.decks = decks
  },
  addDeck (state, deck) {
    state.decks.push(deck)
  },
  updateDeck (state, deck) {
    //
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
