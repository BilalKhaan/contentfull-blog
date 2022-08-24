<template>
  <div>
    <div class="wrapper-1">
      <div v-if="post">
        <BasicArticleHeader></BasicArticleHeader>
        <BasicArticleDetail></BasicArticleDetail>
      </div>
      <div v-else>
        <ErrorPage></ErrorPage>
      </div>
    </div>
  </div>
</template>

<script>
import web  from "@/services/siteName";
import BasicArticleHeader from '@/components/article/BasicArticleHeader.vue'
import BasicArticleDetail from '@/components/article/BasicArticleDetail.vue'
import ErrorPage from '@/components/404.vue'
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ store, params, payload }) {
    // add slash in front and remove slash at the end if exists
    var slug = "/"+params.pathMatch.replace(/\/$/, "") 
    await store.dispatch('basic-articles/fetchPost', {slug, payload})
    await store.dispatch('navigation-links/fetchNavigationLinks')
  },
  async fetch ({store, params}) {
    // @Fixme: Merge fetch and asyncData methods. They are used for the same thing.
    // get everything before first slash (= semantic cluster)
    var cluster = params.pathMatch.split('/')[0]
    await store.dispatch('basic-articles/fetchPostsByCluster', cluster)

  },
  components: {
    BasicArticleHeader,
    BasicArticleDetail,
    ErrorPage
  },

  jsonld() {
    let webName = web.siteName();
    let name = 'auto-assurance.be';
    if(webName === 'auto-assurance') {
      return this.getApplicationStructure(name, 4.5, 293);    
    }
    else if(webName ===  'devis-assurance-habitation') {
      name = 'devis-assurance-habitation.be';
      return this.getApplicationStructure(name, 4.5, 182);
    }
    else {
      name = 'assurances-hospitalisations.be';
      return this.getApplicationStructure(name, 4.5, 394);
    }
  },
  computed: {
    ...mapGetters({
      post: 'basic-articles/getPost'
    })
  },
  head () {
    const backgroundImage = this.post.fields.backgroundPicture && 
      this.post.fields.backgroundPicture.fields ? this.post.fields.backgroundPicture.fields.file.url : require('@/assets/images/place-holder.png')
    return {
      title: this.post.fields.title,
      meta: [
        {
          name: 'description',
          content: this.post.fields.metadescription
        },
        //{ 
        //  property: 'keywords',
        //  content: this.post.fields.keywords
        //},
        { 
         content: 'website',
         property : 'og:type'
        },
        { 
         content: this.post.fields.title,
         property : 'og:title'
        },
        { 
         content: this.post.fields.metadescription,
         property : 'og:description'
        },
        { 
         content: 'https://seraphin.be/fr/taxe-mise-en-circulation/vehicule/voiture',
         property : 'og:url'
        },
        { 
         content: backgroundImage,
         property : 'og:image'
        },
        { 
         content: this.post.fields.header,
         property : 'og:site_name'
        },
        //{ 
        // property : 'og:key-words',
        // content: this.post.fields.keywords
        //}
        { 
         name: 'twitter:title',
         content: this.post.fields.title
        },
        { 
         name: 'twitter:description',
         content: this.post.fields.metadescription
        },
        { 
         name: 'twitter:url',
         content: 'https://seraphin.be/fr/taxe-mise-en-circulation/vehicule/voiture'
        },
        { 
         name: 'twitter:image',
         content: backgroundImage
        },
        {
         name: 'twitter:card', 
         content: 'summary'
        },                   
      ]
    }
  },  
  methods: {
    getApplicationStructure(name, ratingvalue, ratingCount ) {
      const data = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
       name: name,
       operatingSystem: "Web-based",
       applicationCategory: "Auto Insurance",
       aggregateRating: {
        "@type": "AggregateRating",
         ratingvalue : ratingvalue,
         bestRating : 5,
         ratingCount : ratingCount
        },
        offers: {
          "@type": "Offer",
          price : 0.00,
          priceCurrency : 'EUR'
        }
      }
      return data;
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>


.wrapper-1 {
  background-color: #fff;
  padding-bottom: 100px;
}
</style>
