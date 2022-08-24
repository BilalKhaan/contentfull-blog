<template>
  <div class="container">
    <div v-if="this.flag">
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
  import Footer from '@/layouts/Footer.vue'
  import md5  from 'js-md5'
  //@FixMe, Vue modules should be imported through plugins folder: https://nuxtjs.org/guide/plugins/
  import Vue from 'vue'
  import VueCookies from 'vue-cookies'
  Vue.use(VueCookies)
export default {
  components: {
    Footer
  },

  data() {
    return {
      flag: false
    }
  },

  created() {
    if(process.client) {
      (process.env.CTF_HOST == "preview.contentful.com" || this.$route.name == "validation") && !this.$cookies.get("password") ? 
        this.password : this.flag = true;
    }
    else this.flag = true
  },

  computed: {
    password() {
      var pass1 = "";
      if(process.client) {
        pass1 = prompt('Please Enter Your Password', '');
        const password = "34faa670e4e9f50029aaab057dcb2a63";
        this.flag = md5(pass1.toLowerCase()) == password;
        this.$cookies.set("password",this.flag ? password : '', 60 * 60 * 24 * 30);
      }
      else this.flag = true
    }  
  }
}
</script>
<style>
@font-face {
  font-family: 'MarkPro';
  font-display: swap;
  font-weight: normal;
  src: url('~static/fonts/MarkPro/Mark-Pro.woff'); /* IE9 Compat Mode */
  src: url('~static/fonts/MarkPro/Mark-Pro.woff') format('woff'),
       url('~static/fonts/MarkPro/Mark-Pro.otf') format('otf'),
       url('~static/fonts/MarkPro/Mark-Pro.ttf') format('ttf'),
       url('~static/fonts/MarkPro/Mark-Pro.svg') format('svg');
}
@font-face {
  font-family: 'Avenir Book';
  font-display: swap;
  font-weight: normal;
  src: url('~static/fonts/Avenir Book/331ec49c0d78e469c42c1d814dd45838.woff'); /* IE9 Compat Mode */
  src: url('~static/fonts/Avenir Book/331ec49c0d78e469c42c1d814dd45838.eot') format('woff'),
       url('~static/fonts/Avenir Book/331ec49c0d78e469c42c1d814dd45838.woff2') format('woff2'),
       url('~static/fonts/Avenir Book/331ec49c0d78e469c42c1d814dd45838.ttf') format('ttf'),
       url('~static/fonts/Avenir Book/331ec49c0d78e469c42c1d814dd45838.svg') format('svg');
}
</style>

