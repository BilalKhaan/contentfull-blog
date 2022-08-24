<template>
  <div>
    <div class="c-quote">
      <div class="c-quote__container">
        <h3 class="c-quote__name">{{ reviewRating }} de client satisfait</h3>
      </div>
    </div>
    <blockquote class="c-quote-big">
      <h4 class="c-quote-big__heading">Taxe de Mise en Circulation</h4>
      <span>
        <img class="c-blog-rating-stare lazyload" src="@/assets/images/rating-stare.svg" />
      </span>
      <span>
        <img class="c-blog-rating-stare lazyload" src="@/assets/images/rating-stare.svg" />
      </span>
      <span>
        <img class="c-blog-rating-stare lazyload" src="@/assets/images/rating-stare.svg" />
      </span>
      <span>
        <img class="c-blog-rating-stare lazyload" src="@/assets/images/rating-stare.svg" />
      </span>
      <p class="c-quote-big__text">{{ reviewDescription }}</p>
      <div class="c-quote-big-footer">
        <h4 class="c-quote-big-footer__title">Guillaume Q.</h4>
        <p class="c-quote-big-footer__sub-title">Professeur d'économie</p>
        <img class="quote-image" :src="reviewImage" />
      </div>
    </blockquote>
  </div>
</template>
<script>
export default {
  props: ["review"],
  computed: {
    reviewRating() {
      return this.review.fields.rating || "0";
    },

    reviewImage() {
      return this.review.fields.avatar
        ? this.review.fields.avatar.fields.file.url
        : require("@/assets/images/place-holder.png");
    },

    reviewDescription() {
      return this.review.fields.description || "";
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.c-quote-big {
  display: block;
  position: relative;
  text-align: left;
  padding-left: 200px;
  padding-right: 20px;
  max-width: 700px;
  min-height: 140px;
  margin: 0 auto;
  &__heading {
    @include text-style(#576977, $font-breadcrumb, 500, 17px);
  }
  .c-blog-rating-stare {
    height: 15px;
    width: 15px;
    display: inline-block;
  }
  &__text {
    @include text-style(#576977, $font-breadcrumb, 400, 26px);
    line-height: 1.4;
    margin: 15px 0;
    &:before {
      content: "“";
      font-size: 100px;
      width: 0;
      line-height: 0;
      position: relative;
      top: 49px;
      left: -5px;
      display: inline-block;
      opacity: 0.2;
      margin-top: -34px;
    }
  }
  .c-quote-big-footer {
    .quote-image {
      width: 170px;
      height: 170px;
      margin-left: 0;
      border-radius: 100%;
      position: absolute;
      left: 0;
      top: 6px;
      border: 8px solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>