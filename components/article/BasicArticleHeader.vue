<template>
  <div>
    <Header
     :buttonText="buttonText"
     :buttonLink="buttonLink" 
    />
    <Breadcrumb 
      v-if="breadCrumbs"
      :breadcrumbs="breadCrumbs">    
    </Breadcrumb>
    <div class="main-header">
      <div class="c-hero__mask">
        <div class="c-hero-content">
          <div>
            <h1 class="c-hero-content__title content-title">
              {{ header }}
            </h1>
          </div>
            <ul
              v-if="summaryChecks"
              class="c-hero-content__list">
              <li
                v-for="summaryCheck in summaryChecks"
                class="c-hero-content__item content-checks"
              >
                <img 
                src="@/assets/images/checked.svg" alt="check"
                class="list-item-img lazyload"
                >
                <span class="check-text"> {{ summaryCheck }} </span>
              </li>
            </ul>
            <div>
              <a class="banner-btn button success" :href="buttonLink">
                {{ buttonText }}
              </a>
            </div>
        </div>
      </div>
      <div class="curve">        
      </div>
      <div class="header-image">
        <img :data-src="imageUrl" class="lazyload" />
      </div>
    </div>
  </div>
</template>  
<script>
import Navigation from '~/components/Navigation.vue'
import Breadcrumb from '~/components/article/Breadcrumb.vue'
import Header from '~/components/article/Header.vue'
import web  from "@/services/siteName";

import { mapGetters } from 'vuex'
export default {
  components: {
    Navigation,
    Breadcrumb,
    Header
  },
  computed: {
    ...mapGetters({
      post: 'basic-articles/getPost'
    }),

    backgroundImage() {
      return this.post.fields.backgroundPicture && 
        this.post.fields.backgroundPicture.fields && 
        this.post.fields.backgroundPicture.fields.file
    },
        
    imageUrl () {
      return this.backgroundImage ? this.post.fields.backgroundPicture.fields.file.url+"?w=1300&h=400" : require('@/assets/images/place-holder.png')
    },

    breadCrumbs () {
      return this.post.fields.breadcrumb && this.post.fields.breadcrumb.tree_structure ? this.post.fields.breadcrumb.tree_structure : false
    },

    header() {
      return this.post.fields.header || 'Unknown Header'
    },

    summaryChecks() {
      return this.post.fields.summaryChecks || false
    },

    buttonText() {
      return this.post.fields.callToAction && this.post.fields.callToAction.details ?
        this.post.fields.callToAction.details : 'Unknown Text'
    },

    buttonLink() {
      return this.post.fields.callToAction && this.post.fields.callToAction.link ?
        this.post.fields.callToAction.link : '#'
    },

    siteName() {
      return web.siteName();
    }
  }
}

</script>
<style lang="scss" scoped>

.main-header {
  display: flex;
  flex-wrap: wrap;
  width:100%;
}

.header-image {
  width: 40%;
  img {
    height: 420px;
    width: 100%;
    object-fit: cover;
  }
  @include for-size (sm-only) {
    width: 0;
    display: none;
  }
}
.c-hero {
  background-size: cover;
  color:#fff;
  position: relative;
  z-index: 1;
  margin-bottom: 11%;
  display: inline-block;
  width: 100%;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    padding-bottom: 26%;
    background-repeat: no-repeat;
    background-size: 102%;
    background-position: 10% 0;
    opacity: .7;
    z-index: -1;
    margin-bottom: -4%;
    pointer-events: none;
  }
  &__mask {
    height: 420px;
    width:59.5%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $color-primary;
    justify-content: center;
    @include for-size (tablet) {
      padding-bottom: 50px;
    }
    @include for-size (sm-only) {
      padding-bottom: 80px;
      width: 100%
    }
    .c-hero-content {
      position: relative;
      width: 85%;
      z-index: 2;
      margin: 0 auto;
      @include for-size (sm-only) {
        width: 100%;
        padding-right: 15px;
      }
      &__title {
        margin-bottom: 24px;
        text-shadow: 0 0 10px rgba(0,0,0,.2);
        letter-spacing: 0;
        line-height: 1.3;
        padding-top: 15px;
        @include for-size (md-only) {
          padding-top: 30px;
          font-size: 30px;
        }
        @include for-size (tablet) {
          font-size: 25px;
          width: auto;
          margin: 78px 0 0 20px;
          padding-top: 30px;
        }
        @include for-size (sm-only) {
          font-size: 20px;
          width: auto;
          margin: 68px 0 0 20px;
          padding-top: 30px;

        }
      }
      &__list {
        list-style: none;
        padding: 0;
        margin: 0 0 10px 0;
        @include for-size (tablet) {
          width: auto;
          margin: 30px 0 0 20px;
        }
        @include for-size (sm-only) {
          font-size: 14px;
          width: auto;
          margin: 20px 0 0 20px;
        }
      }
      &__item {
        padding-bottom: 15px;
        display: grid;
        grid-template-columns: 20px auto;
        @include for-size (sm-only) {
          display: flex;
          font-size: 15px;
          margin-bottom: 0px;
          padding-bottom: 9px;  
        }
        .check-text {
          padding-left: 10px;
          @include for-size (sm-only) { 
            padding-top: 5px;
          }
        }
      }
    }
  }
}
.c-hero--overlay-articl {
  &:before {
    z-index: 1;
  }
}


.curve {
  background-color: $color-primary;
  height: 420px;
  width: 0.5%;
  &:before {
    content: '';
    top: 0;
    display: block;
    width: 6px;
    position: sticky;
    border-right: 50px solid transparent;
    border-top: 420px solid $color-primary;
  }
  @include for-size (sm-only) { 
    display: none;
  }
}
.list-item-img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-right: 2px;
  display: inline;
  border-radius: 50%;
  background-color: $checks-bg-color;
}
</style>
