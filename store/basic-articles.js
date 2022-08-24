import {createClient} from '~/plugins/contentful-connector.js'
const client = createClient()
export const state = () => ({
  posts: [],
  clusterPosts: [],
  post: {},
  articleLinkPost: {},
  validatedPosts: []
})

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setClusterPosts (state, payload) {
    state.clusterPosts = payload
  },
  setPost(state, payload) {
    state.post = payload
  },
  setArticleLinkPost (state, payload) {
    state.articleLinkPost = payload
  },
  setValidatedPosts(state, payload) {
    state.validatedPosts = payload
  }
}

export const actions = {
  async fetchPosts ({commit, dispatch}) { 

    try {
      const entries = await client.getEntries({
        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
      commit('setPosts', entries.items)
    }
    catch(error) {
      this.$sentry.captureException(error)
    }
  },
  async fetchPost ({commit, dispatch}, {slug, payload}) {
    // payload is used for faster pre-rendering when running nuxt generate.
    if (payload) {
      commit('setPost', payload)
    }
    else {
      try {
        await client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
          'fields.slug': slug
        }).then(entries => {
          commit('setPost', entries.items[0])
        })
      }
      catch(error) {
        this.$sentry.captureException(error)
      } 
    }
  },
  async fetchArticleLinkPost ({commit, dispatch}, payload) {
    try {
      await client.getEntries({
        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': payload
      }).then(response => {
        commit('setArticleLinkPost', response.entries.items[0])
      })
    }
    catch(error) {
      this.$sentry.captureException(error)
    } 
  },

  async fetchPostsByCluster ({commit, dispatch}, cluster) {
    try {
      if (cluster == "") cluster = "Home"
      cluster = cluster.charAt(0).toUpperCase() + cluster.slice(1)
      const entries = await client.getEntries({
        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.semanticCluster[in]': "Home,"+cluster // [in] operator of contentful API allows to select multiple values
      }).then(entries => {
        commit('setClusterPosts', entries.items)
      })
    }
    catch(error) {
        console.error(error)
        this.$sentry.captureException(error)
    }
  },
  
  validatePosts ({commit, dispatch}, payload) {
    let validatedPosts = [];
    payload.map((p) => {
      let obj ={};
      obj.title = p.fields.title || false;
      obj.semanticCluster = !!p.fields.semanticCluster;
      obj.keywords = !!p.fields.keywords;
      obj.review = !!(p.fields.review && p.fields.review.fields);
      obj.backgroundPicture = !!p.fields.backgroundPicture && p.fields.backgroundPicture.fields
      obj.authorName = (p.fields.author && p.fields.author.fields) && p.fields.author.fields.name
      obj.authorRole = (p.fields.author && p.fields.author.fields) && p.fields.author.fields.role
      obj.authorAvatar = p.fields.author && p.fields.author.fields && p.fields.author.fields.avatar && p.fields.author.fields.avatar.fields && p.fields.author.fields.avatar.fields.file ? p.fields.author.fields.avatar.fields.file.url : false
      obj.slug = p.fields.slug || false
      obj.metadescription = !!p.fields.metadescription 
      obj.breadcrumb = !!(p.fields.breadcrumb && p.fields.breadcrumb.tree_structure)
      obj.labels = !!(p.fields.labels && p.fields.labels.labels)
      obj.header = !!p.fields.header
      obj.articleContent = !!p.fields.articleContent
      obj.callToAction = !!(p.fields.callToAction && p.fields.callToAction.title)
      validatedPosts.push(obj);
    })
    commit('setValidatedPosts', validatedPosts)
  }
}

export const getters = {
  getPosts (state) {
    return state.posts
  },
  getPost (state) {
    return state.post
  },
  getArticleLinkPost (state) {
    return state.articleLinkPost;
  },
  getValidatedPosts(state) {
    return state.validatedPosts
  },
  getClusterPosts(state) {
    return state.clusterPosts
  }
}
