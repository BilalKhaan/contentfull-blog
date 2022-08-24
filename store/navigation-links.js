import { createClient } from '~/plugins/contentful-connector.js'
const client = createClient()

export const state = () => ({
  navigationLinks: {}
})

export const mutations = {
  setNavigationLinks(state, payload) {
    state.navigationLinks = payload
  }
}

export const actions = {
  async fetchNavigationLinks({ commit, dispatch }) {
    try {
      const entries = await client.getEntries({
        'content_type': 'navigationLinks',
        order: '-sys.createdAt'
      })
      commit('setNavigationLinks', entries.items[0])
    }
    catch (error) {
      this.$sentry.captureException(error)
    }
  }
}

export const getters = {
  getNavigationLinks(state) {
    return state.navigationLinks
  }
}