<template>
  <div class="c-blog-flex__share">
    <!-- Unfortunately, putting v-if here results in this bug: https://github.com/nuxt/nuxt.js/issues/5800 -->
    <div v-show="isHTwo">
      <VueToc />
    </div>
    <div class="c-share">
      <p class="c-share__title">{{ callToAction.title }}</p>
      <a class="button" :href="callToAction.link">Obtenir mon devis</a>
      <div class="partager">
        <div class="partager__text">
          <p> <strong> partager: </strong></p>
        </div>
        <div class="c-share-link__icon">
          <img
            data-src="@/assets/images/facebook.svg"
            alt="partager"
            class="lazyload"
            @click="openDialog(shareUrls['facebook'],
            objectToParams({ u: `${host}${$route.path}`}))"
          />
        </div>
        <div class="c-share-link__icon">
          <img
            data-src="@/assets/images/twitter.svg"
            alt="partager"
            class="lazyload"
            @click="
            openDialog(shareUrls['twitter'],objectToParams({ url: `${host}${$route.path}`}))"
          />
        </div>
        <div class="c-share-link__icon">
          <img
            data-src="@/assets/images/linkedin.png"
            class="lazyload"
            alt="partager"
            @click="
            openDialog(shareUrls['linkedin'],objectToParams({ mini: true, url: `${host}${$route.path}` }))"
          />
        </div>
      </div>
      <div class="rating-stars">
        <p>Cet article a été noté {{ rating }} par les lecteurs avant vous</p>
        <client-only>
          <!-- @Fixme: star-rating plugin doesn't support SSR: https://github.com/craigh411/vue-star-rating/issues/17 -->
          <star-rating
          v-model="rating"
          :round-start-rating="false"
          :show-rating="false"
          :star-size="50"
          :read-only="true"
          v-bind:star-size="25"
          >
          </star-rating>
        </client-only>
      </div>    
    </div>
  </div>
</template>
<script>
  var hTwoOffsetArray = [];
import objectToParams from "@/services/objectToParams";
import VueToc from "vue-toc";
import StarRating from 'vue-star-rating'
import ClientOnly from 'vue-client-only'

export default {
  props: ["callToAction"],
  components: {
    VueToc,
    StarRating,
    ClientOnly
  },

  async mounted() {
    await this.checkHTwo(); 
    this.removeHTwos();
    this.removeHThrees();
    this.scrollHandler();
  },

  data() {
    return {
      shareUrls: {
        facebook: "https://www.facebook.com/sharer/sharer.php",
        whatsapp: "https://api.whatsapp.com/send",
        googlePlus: "https://plus.google.com/share",
        linkedin: "https://linkedin.com/shareArticle",
        pinterest: "https://pinterest.com/pin/create/button",
        telegram: "https://telegram.me/share/",
        twitter: "https://www.twitter.com/share"
      },
      isHTwo: false,
      rating: 4.5
    };
  },

  computed: {
    host() {
      return location.host;
    }
  },

  methods: {
    objectToParams,
    openDialog(socialUrl, params) {
      window.open(`${socialUrl}${params}`, "__blank");
    },

    checkHTwo() {
      let hTwoCount = document.getElementsByTagName("h2");
      this.isHTwo = hTwoCount.length > 0;
    },

    async removeHTwos() {
      var main = document.getElementById("content-box");
      var hTwosInToc = await document.getElementsByClassName("toc-2");
      var hTwo = [];
      var tempHtwo = [];
      hTwo = main.getElementsByTagName('h2');
      Object.keys(hTwo)
        .forEach(function(index) {
          tempHtwo.push(hTwo[index].innerText);
          hTwoOffsetArray.push({ text: hTwo[index].innerText,
           offsetTop: hTwo[index].offsetTop});
        });
      Object.keys(hTwosInToc)
        .reverse()
        .forEach(async function(index) {
          let a = await hTwosInToc[index].getElementsByTagName("a");
          !tempHtwo.includes(a[0].text) ? hTwosInToc[index].parentElement.remove()
           : ''
        })
    },

    async removeHThrees() {
      var hThrees =  await document.getElementsByClassName("toc-3");
      if (hThrees.length > 0) {
        Object.keys(hThrees)
          .reverse()
          .forEach(function(index) {
            hThrees[index].parentElement.remove();
          });
      }
    },

    async scrollHandler() {
      if(process.client) {
        var toc = await document.getElementsByClassName('vue-toc')[0];
        var anchor = await toc.getElementsByTagName('a');
        var Htwos = document.getElementsByTagName('h2');
        Object.keys(anchor)
        .reverse()
        .forEach(async function(index) {
          anchor[index].onclick = async (event) => {
            event.preventDefault();
            var offsetIndex = hTwoOffsetArray.findIndex((f) => f.text == anchor[index].text);
            window.scrollTo({ top: hTwoOffsetArray[offsetIndex].offsetTop,
             behavior: 'smooth' });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.partager {
  margin-top: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 5px;
  &__text {
    display: inline-block;
    margin-left: 15px;
  }
}
.rating-stars {
  display: block;
  width: 100%;
  margin-top: 20px;
  &__icon {
    width: 20px;
    height: 20px;
  }
}
.c-share {
  margin-top: 50px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
  &__title {
    line-height: 1.2;
    text-align: center;
    margin-top: 0;
    margin-bottom: 15px;
    color: #576977;
    font-family: $font;
    font-weight: bold;
  }
  &__label {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
    margin-top: 20px;
  }
  .c-share-link {
    display: inline-block;
    margin-top: 10px;
    &__icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 25px;
      border: 1px solid grey;
      border-radius: 50%;
      margin-left: 10px;
      cursor: pointer;
      margin-top: 10px;
    }
  }
}
// Deep selector targets children components
/deep/ .vue-toc {
  background-color: #fff;
  ul {
    margin: 0px;
    line-height: 1.5;
    text-align: left;
    padding-top: 5px;
    font-family: $font-blog-content;
    font-size:18px;
    list-style-type: none;
    border: 1px solid #eee;
  }
  li {
    a {
      display: block;
      color: #424649;
      padding: 20px 15px;
      line-height: 26px;
      position: relative;
      z-index: 1;
      text-decoration: none;
    }
  }
}
</style>