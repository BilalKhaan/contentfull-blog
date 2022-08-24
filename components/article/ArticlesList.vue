<template>
    <div class="articles-similaires__container">
      <div class="c-blog-card">
        <Carousel
          :per-page="slide"
          :per-page-custom="custom"
          :pagination-size="paginationSize"
          :pagination-enabled="false"
        >
          <Slide v-for="post in posts" :key="post.slug">
            <ArticlePreview 
              :post="post"
            >
            </ArticlePreview>
          </Slide>
        </Carousel> 
      </div>
    </div> 
</template>
<script>
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue' 
import Navigation from '~/components/Navigation.vue'
import ArticlePreview from '~/components/ArticlePreview.vue'
import web  from "@/services/siteName"; 

export default {
	props: ['posts'],
	components: {
    Navigation,
    ArticlePreview,
    Carousel,
    Slide
  },
  data() {
    return {
      custom: [[767,2], [1024, 3]],
      paginationSize: 15,
      slide: 1
    }
  },
  jsonld() {
    const items = this.posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${this.baseUrl}${this.$nuxt.$route.path == '/' ?  '/' : post.fields.slug+'/'}`,
    }));
    return {
      '@context': 'http://schema.org',
      '@type': 'ItemList',
      name: web.siteName(),
      itemListElement: items
    };
  },
  computed: {

    baseUrl(){
      this.currentUrl = process.env.URL
      return this.currentUrl
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.articles-similaires {
  &__container {
    width: 1200px;
    margin: 0 auto;
    cursor: pointer;
    @include for-size (md-only) {
      width: 80%;
    }
    @include for-size (tablet) {
      width: 80%;
    }
    @include for-size (sm-only) {
      width: 100%;
    }
  }
}

.c-blog-card {
  cursor: pointer;
}

</style>