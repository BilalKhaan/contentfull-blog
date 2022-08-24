<template>
  <div>
    <div v-if="isScrolled" class="scroll-effect">
      <div class="site-name">
        <img 
        :data-src="require(`@/assets/images/${this.siteName}/logo_complete.png`)" 
        alt="websitelogo"
        class="lazyload"
        />
      </div>
      <div class="call-to-action">
        <a class="banner-btn button success" :href="buttonLink">
          Obtenir mon devis
        </a>
      </div>
    </div>
  	<header v-if="!isScrolled" class="header-container">
      <div class="site-name">
        <img
        :data-src="require(`@/assets/images/${this.siteName}/logo_complete.png`)" 
        alt="websitelogo"
        class="lazyload"  
        />
      </div>
      <div class="header-call-to-action">
        <div v-show="headerLinks" class="menu-link" v-for="headerLink in headerLinks" :key="label(headerLink)">
          <a @click="$router.push(url(headerLink))">{{ label(headerLink) }}</a>
        </div>
        <div class="call-to-action">
          <a class="banner-btn button success" :href="buttonLink">
            {{ buttonText }}
          </a>
        </div>
      </div>
      <div class="burger-icon">
        <img data-src="@/assets/images/open-menu.svg" alt="menue-icon" 
        class="lazyload" />
      </div>
  	</header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import web  from "@/services/siteName"; 

export default {
  props: ["buttonText", "buttonLink"],
  mounted () {
    this.scroll()
  },
  data() {
    return {
      isScrolled: false,
      mobile: false,
    }
  },
  computed: {
    ...mapGetters({
      navigationLinks: 'navigation-links/getNavigationLinks'
    }),
    headerLinks() {
      return this.navigationLinks && this.navigationLinks.fields &&
        this.navigationLinks.fields.headerLinks ?
      this.navigationLinks.fields.headerLinks : null
    },
  	siteName() {
      return web.siteName();         
    }
  },
  methods: {
    label(headerLink) {
      return headerLink.fields.label
    },
    url(headerLink) {
      return headerLink.fields.url || '#'
    },
    scroll () {
      if(window.screen.width < 767) {
        window.onscroll = () => {
          this.isScrolled = !(window.scrollY === 0);
        }
      } 
    }
  }
};
</script>
<style lang="scss">
.scroll-effect {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items:center;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.09);
}
.header-container {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  align-items: center;
  padding-top: 10px;
  @include for-size (sm-only) { 
    flex-direction: row;
  }
  .burger-icon {
    display: none;
    @include for-size (sm-only) {
      width: 15%;
      text-align: center;
      display: block;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .header-call-to-action {
    padding-top: 15px;
    width: 63%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @include for-size (sm-only) {
     display: none;
    }
    a {
      text-decoration: none;
      font-family: $font;
      font-size: 16px;
      font-weight: bold;
      @include for-size (sm-only) {
        margin-left: 0px;
        font-size: 12px;
      }
    }
    @include for-size (sm-only) {
      font-size: 10px;
      padding-left: 10px;
      padding-top: 0px;
      margin-top: -10px;
      padding-bottom: 10px;
      width: 100%;
    }
    @include for-size (tablet) { 
      padding-bottom: 10px;
    }
  }
  .menu-link {
    padding-top: 15px;
    @include for-size (sm-only) {
     padding-top: 30px;
    }
  }
}
.sticky {
  position: sticky;
  top: 0;
}
.site-name {
  padding-left: 20px;
  width: 37%;
  padding-bottom: 10px;
  @include for-size (sm-only) {
   width: 85%;
   padding-left: 0px;
   text-align: center;
  }  
}
.logo {
  margin-top: -20px;
  @include for-size (sm-only) {
    margin: 0;
    padding: 0;
  }
}
.call-to-action {
  padding-bottom: 10px;
  padding-right: 10px;
  a {
    background-color: $checks-bg-color;
    text-align: center;
    @include for-size (sm-only) {
      font-size: 9px;
      margin-right: 0;
    }
  }
}
</style>