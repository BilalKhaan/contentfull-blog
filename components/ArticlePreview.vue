<template>
  <div class="c-blog-card-link">
    <div 
      class="c-blog-card-meta" v-lazy-container="{ selector: 'img' }">
      <img 
      class="c-blog-card-meta__img" 
      v-bind:data-src="imageUrl" 
      v-bind:data-loading="imageUrlLazy"
      />
    </div>
    <div class="c-blog-card-content">
      <p class="c-blog-card-content__meta">15/10/2019</p>
      <h3 class="c-blog-card-content__title">
        {{ post.fields.title }}
      </h3>
      <div class="metadescription">
        <span>
          {{ post.fields.metadescription }}
        </span>
      </div>
      <div class="voir-article">
        <button @click="post.fields.slug ? $router.push(`${post.fields.slug}/`) : $router.push('/error')"> <strong> Voir l'article </strong></button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: ['post'],
  computed: {
    backgroundImage() {
      return this.post.fields.backgroundPicture && 
        this.post.fields.backgroundPicture.fields && 
        this.post.fields.backgroundPicture.fields.file
    },

    imageUrl () {
      return this.backgroundImage ? this.post.fields.backgroundPicture.fields.file.url+"?w=700&h=500" : require('@/assets/images/place-holder.png')
    },
    imageUrlLazy () {
      return this.backgroundImage ? this.post.fields.backgroundPicture.fields.file.url+"?w=60&h=60" : require('@/assets/images/place-holder.png')
    },

    labels () {
      return (this.post.fields.labels && this.post.fields.labels.labels) &&
        this.post.fields.labels.labels
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.voir-article {
  text-align: center;
  padding-top: 20px;
  button {
    width: 100px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0), 0 2px 6px 0 rgba(49, 49, 93, 0.15);
    height: 30px;
    border: 0px;
    border-radius: 3px;
    color: white;
    background: linear-gradient(45deg, #5F78FB 0%, #2EB6F9 100%);
    cursor: pointer;
  }
}
.c-blog-card-link {
  margin: 15px;
  cursor: default;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.09);
  height: 477px;
  .c-blog-card-content {
    padding: 15px 20px 30px 20px;;
    &__meta {
      margin: 0;
      @include text-style ($color-text-primary, $font-minor-title, 500, 16px);
    }
    &__title {
      margin: 5px 0 0 0;
      font-size: 22px;
      line-height: 1.2;
      font-weight: 800;
      height: 104px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      color: #576977;
      transition: 0.5s;
    }
  }
  .c-blog-card-meta {
    &__img {
      height: 180px;
      width: 100%;
      object-fit: cover;
      @include for-size (sm-only) {
       
      }
    }
  }
  &:hover {
    .c-blog-card-content {
      &__title {
        color: #246dc6;
        transition: 0.5s;
      }
    }
  }
}
.metadescription {
  text-align: center;
  font-family: $font;
  font-size: 15px;
}
</style>
