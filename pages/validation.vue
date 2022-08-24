<template>
  <div v-if="posts">
    <BasicArticleValidation :validPosts="validPosts"></BasicArticleValidation>
  </div>
  <div v-else>
    <ErrorPage></ErrorPage>
  </div>
</template>

<script>
import BasicArticleValidation from '@/components/article/BasicArticleValidation.vue'
import ErrorPage from '@/components/404.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  async asyncData ({ store, params }) {
    await store.dispatch('basic-articles/fetchPosts')
  },

  created() {
    this.validatePosts(this.posts)
  },

  components: {
    BasicArticleValidation,
    ErrorPage
  },

  computed: {
    ...mapGetters({
      posts: 'basic-articles/getPosts',
      validPosts: 'basic-articles/getValidatedPosts'
    })
  },

  methods: {
    ...mapActions({
      validatePosts: 'basic-articles/validatePosts'
    })
  }  
}
</script>

<style lang="scss" rel="stylesheet/scss" scpoed>
</style>
