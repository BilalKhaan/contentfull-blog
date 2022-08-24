<template>
	<div class="c-breadcrumbs">
    <ol class="c-breadcrumbs__list">
      <li class="c-breadcrumbs__item" v-for="bredcrum in breadcrumbs">
        <a class="c-breadcrumbs__link" :href="bredcrum.url">
          <span class="breadcrumbs-text">{{ bredcrum.text }}</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import web  from "@/services/siteName"; 

export default {
	props: ['breadcrumbs'],
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        "@id": `${this.baseUrl}${this.$nuxt.$route.path == '/' ?  '/' : this.$nuxt.$route.path+'/'}${'breadcrumbs/'}${index + 1}`,
        name: item.text,
      },
    }));
    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
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
a {
  text-decoration: none;
}
.c-breadcrumbs {
  display: block;
  position: relative;
  z-index: 2;
  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 4px 0px 5px 12px;
    position: absolute;
    top: 25px;
    left: 20px;
    background:#fff;
    border-radius: 3px;
    box-shadow: 0 0 1px 0
    rgba(0,0,0,.2),0 2px 10px 0 rgba(0,0,0,.09);
    @include for-size (sm-only) {
      padding: 6px 0px 4px 5px;
      font-size: 5px;
      max-width: 68%;
    }
    @include for-size (tablet) {
      padding: 6px 0px 4px 5px;
      font-size: 10px;
      max-width: 63%;
    }
  }
  &__item {
    position: relative;
    padding-right: 20px;
    white-space: nowrap;
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      width: 7px;
      height: 7px;
      border: 1px solid #909fab;
      border-left: 0;
      border-bottom: 0;
      -webkit-transform: scaleX(1.2) rotate(45deg);
      transform: scaleX(1.2) rotate(45deg);
      position: absolute;
      right: 8px;
      top: 10px;
      border-top-right-radius: 2px;
      @include for-size (sm-only) {
        top: 5px;
      }
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  &__link {
    display: block;
    padding: 0 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    .breadcrumbs-text {
      @include text-style ( $color-text-primary, $font-breadcrumb, 400, 16px);
      @include for-size (sm-only) {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
