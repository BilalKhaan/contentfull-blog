<template>
  <div class="c-blog">
    <div class="c-blog__container">
      <div class="c-blog-flex">
        <CalltoAction 
         v-if="callToAction"
         :callToAction="callToAction"
        >
        </CalltoAction>
        <div class="c-blog-flex__article">
          <div class="article-header">
            <div class="article-header-info">
              <div class="c-avatar">
                <img class="c-avatar__img" :src="authorImage" 
                v-bind:alt="authorImageDescription" />
                <div class="c-avatar__info">
                  <div class="c-avatar__name">
                    {{ authorName }}
                  </div>
                  <div class="c-avatar__meta">
                    {{ authorRole }}
                  </div>
                  <div class="c-avatar__meta">
                    {{ authorCreatedAt }}
                  </div>
                </div>
              </div>
              <div class="c-blog-tag">
                <span class="c-label c-label-text" v-for="label in labels">
                  {{ label }}
                </span>
              </div>
            </div>
          </div>
          <div id="content-box" class="c-blog-content blog-content-text">
            <span class="c-blog-content__pera">
              <vue-markdown :source = post.fields.articleContent
              >
              </vue-markdown>
            </span>  
          </div>
        </div> 
      </div>
    </div>
    <Reviews
      v-if="review"
     :review="review" 
    >
    </Reviews>
    <div v-if="post.fields.faqTitle" class="faq">
      <FAQ :faqTitle="post.fields.faqTitle" :faqContent="post.fields.faqContent"/>
    </div>
    <div class="c-quote">
      <div class="c-quote__container">
        <h2 class="c-quote__name">Articles Similaires</h2>
      </div>
    </div>
    <div class="articles-similaires">
      <ArticlesList 
       :posts="showPosts"
      > 
      </ArticlesList>
    </div>
  </div>
</template>
<script>
import CalltoAction from '@/components/article/CallToAction.vue' 
import Reviews from '~/components/article/Reviews.vue'
import ArticlesList from '~/components/article/ArticlesList.vue'
import FAQ from '~/components/article/FAQ.vue'
import VueMarkdown from 'vue-markdown'
import web  from "@/services/siteName";

import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    VueMarkdown,
    ArticlesList,
    Reviews,
    FAQ,
    CalltoAction,
  },

  mounted() {
    this.articleLink();
  },

  jsonld() {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${this.baseUrl}${this.$nuxt.$route.path == '/' ?  '' : this.$nuxt.$route.path+'/'}`,
      headline: this.post.fields.title,
      image: {
        "@type": 'ImageObject',
        url: this.imageUrl,
        width: '1300',
        height: '400',
        caption: this.post.fields.articleContent
      },
      keywords: 'insurence',
      datePublished: this.post.sys.createdAt,
      dateModified: this.post.sys.updatedAt,
      articlesection: this.semanticCluster,
      author: {
        "@type": "Person",
        name: this.authorName,
        Image: this.authorImage
      },
      publisher: {
        "@type": "Organization",
        name : 'Seraphin',
        url : `${this.baseUrl}`,
        logo: {
          "@type": "ImageObject",
          "@id": this.logoUrl,
          url: this.logoUrl,
          width: '200',
          height: '200'
        }
      },
      mainEntityOfPage: {
        "@type": 'WebPage', 
        url : `${this.baseUrl}`,
        inLanguage: 'FR',
        Name: 'H1',
        datePublished: "2015-02-05T08:00:00+08:00",
        dateModified: "2015-02-05T08:00:00+08:00",
        description : this.metadescription,
        isPartOf: {
          "@type": 'WebSite',
          "@id":  `${this.baseUrl}`,
          url : `${this.baseUrl}`,
          name : 'Seraphin'
          // publisher: {
          //   "@type" : 'Organization',  
          //   cf: 'Organization pour la suite'
          // }
        }
      }
    }
  },

  data () {
    return {
      similarArticlesArray: [], 
    }
  },

  computed: {
    ...mapGetters({
      post: 'basic-articles/getPost',
      getArticleLinkPost: 'basic-articles/getArticleLinkPost',
      clusterPosts: 'basic-articles/getClusterPosts'
    }),

    backgroundImage() {
      return this.post.fields.backgroundPicture && 
        this.post.fields.backgroundPicture.fields && 
        this.post.fields.backgroundPicture.fields.file
    },
        
    imageUrl () {
      return this.backgroundImage ? this.post.fields.backgroundPicture.fields.file.url+"?w=1300&h=400" : require('@/assets/images/place-holder.png')
    },

    siteName() {
      return web.siteName();
    },

    logoUrl() {
      return require(`@/assets/images/${this.siteName}/logo_complete.png`)
    },

    articleBackgroundImage() {
      return this.getArticleLinkPost.fields.backgroundPicture && 
        this.getArticleLinkPost.fields.backgroundPicture.fields && 
        this.getArticleLinkPost.fields.backgroundPicture.fields.file
    },
        
    articleLinkImageUrl () {
      return this.articleBackgroundImage ? this.getArticleLinkPost.fields.backgroundPicture.fields.file.url+"?w=1300&h=400" : require('@/assets/images/place-holder.png')
    },

    isAuthorField () {
      return this.post.fields.author && this.post.fields.author.fields 
    },

    showPosts () {
      // if there are no similar articles defined in contentful, return all Posts
      var posts = this.similarArticles.length > 0 ? this.similarArticles : this.clusterPosts
      return posts
    },

    getClusterPosts() {
      return this.clusterPosts
    },

    postsAvailable() {
      return this.posts.length > 0
    },

    authorName () {
      return this.isAuthorField && this.post.fields.author.fields.name ? 
        this.post.fields.author.fields.name : 'Unknown Author' 
    },

    authorRole () {
      return this.isAuthorField && this.post.fields.author.fields.role ?
        this.post.fields.author.fields.role : 'Unknown Role'
    },

    authorImage () {
      return this.isAuthorField && this.post.fields.author.fields.avatar && this.post.fields.author.fields.avatar.fields ? this.post.fields.author.fields.avatar.fields.file.url+"?w=60&h=60" : require('@/assets/images/place-holder.png')
    },

    authorImageDescription () {
      return this.isAuthorField && this.post.fields.author.fields ? this.post.fields.author.fields.role : "expert en assurances"
    },

    authorCreatedAt () {
      if(this.isAuthor && this.post.fields.author.sys && this.post.fields.author.sys.createdAt) {
        const date = this.post.fields.author.sys.createdAt.slice(0, 10)
        return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
      }
      return ''
    },

    host() { //without slash
      console.error("deprecated, not good for pre-rendering. use baseUrl instead")
      if(process.client) {
        return location.host;
      }
    },

    baseUrl(){
      this.currentUrl = process.env.URL
      return this.currentUrl
    },


    labels () {
      return (this.post.fields.labels && this.post.fields.labels.labels) && this.post.fields.labels.labels
    },
    
    semanticCluster () {
      return this.post.fields.semanticCluster || ''
    },

    review () {
      return (this.post.fields.review && this.post.fields.review.fields)
        && this.post.fields.review
    },

    callToAction () {
      return this.post.fields.callToAction || false
    },

    similarArticles () {
      if (this.similarArticlesArray.length > 0) return  this.similarArticlesArray
      if(this.post.fields.hasOwnProperty('similarArticle1')  && this.post.fields.similarArticle1.hasOwnProperty('fields') ) {
        this.similarArticlesArray.push(this.post.fields.similarArticle1);
      }
      if(this.post.fields.hasOwnProperty('similarArticle2')&& this.post.fields.similarArticle2.hasOwnProperty('fields') ) {
        this.similarArticlesArray.push(this.post.fields.similarArticle2);
      }
      if(this.post.fields.hasOwnProperty('similarArticle3')&& this.post.fields.similarArticle3.hasOwnProperty('fields') ) {
        this.similarArticlesArray.push(this.post.fields.similarArticle3);
      }
      return this.similarArticlesArray;
    }
  },
  methods: {
    ...mapActions({
      fetchPostsByCluster: 'basic-articles/fetchPostsByCluster',
      fetchArticleLinkPost: 'basic-articles/fetchArticleLinkPost'
    }),

    async articleLink() {
      var parent = await document.getElementById('article-link');
      if(parent) {
        var text = await parent.getElementsByTagName('p');
        var img = await parent.getElementsByTagName('img');
        var span = await parent.getElementsByTagName('span');
        var a = await parent.getElementsByTagName('a');
        var slug = text[0].innerText;
        await this.fetchArticleLinkPost(slug);
        img[0].src = this.articleLinkImageUrl;
        span[0].innerText = this.getArticleLinkPost.fields.metadescription;
        a[0].onclick = () => {
          this.$router.push(slug);
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.c-blog {
  &__container {
    width: 1250px;
    margin: 0 auto;
    @include for-size (tablet) {
      width: 90%;
    }
    @include for-size (sm-only) {
      width: 90%;
    }
  }
  .c-blog-flex {
    display: flex;
    @include for-size (tablet) {
      display: flex;
      flex-direction: column-reverse;
    }
    @include for-size (sm-only) {
      display: flex;
      flex-direction: column-reverse;
    }
    &__share {
      width: 400px;
      background-color: #fff;
      padding: 2px;
      margin: 145px 10px 0px;
      border-radius: 3px;
      text-align: center;
      height: fit-content;
      position: sticky;
      top: 30px;
      @include for-size (tablet) {
        width: 100%;
        height: auto;
      }
      @include for-size (sm-only) {
        width: 100%;
        position: inherit;
        margin-bottom: 0;
        height: fit-content;
        margin-top: 30px;
      }
    }
    &__article {
      background-color: #fff;
      width: 100%;
      padding: 40px;
      margin-top: 0px;
      z-index: 2;
      @include for-size (sm-only) {
        padding: 25px 15px;
      }
      .article-header {
        margin-bottom: 32px;
      }
      .article-header-info {
        display: flex;
        align-items: flex-start;
        @include for-size (sm-only) {
          flex-direction: column;
        }
      }
      .c-avatar {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        &__img {
          width: 60px;
          height: 60px;
          border-radius: 60px;
        }
        &__info {
          margin-left: 20px;
        }
        &__name {
          @include text-style (#576977, $font-breadcrumb, 600, 20px);
        }
        &__meta {
          @include text-style ($color-text-primary, $font-breadcrumb, 400, 16px);
        }
      }
      .c-blog-tag {
        margin-top: 4px;
        margin-left: auto;
        display: flex;
        flex-wrap: wrap;
        padding-left: 30px;
        @include for-size (sm-only) {
          justify-content: flex-start;
          padding-left: 0;
          margin-top: 15px;
        }
      }
      .c-blog-content {
        span {
          line-height: 1.5;
          text-align: justify;
          margin-bottom: 18px;
          @include for-size (sm-only) {
            font-size: 16px;
            text-align: justify;
            line-height: normal;
          }
        }
        .blog-content-inner-img {
          width: auto;
          margin: 40px auto;
          display: block;
          padding: 10px;
          border: 1px solid #dae2e8;
          border-radius: 10px;
        }
        .c-blog-box {
          &__pera {
            line-height: 1.5;
            text-align: justify;
          }
        }
        .c-blog-steps {
          padding-top: 30px;
          margin-top: auto
        }
        .text-center {
          text-align: center;
        }
        .c-blog-question {
          margin-top: 24px;
          padding: 18px 24px 24px;
          background: #f7f7f8;
          border-radius: 3px;
          &__title {
            line-height: 1.5;
            text-align: justify;
          }
          .button-group {
            margin-top: 15px;
            .question-btn {
              padding: 10px 30px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

</style>
