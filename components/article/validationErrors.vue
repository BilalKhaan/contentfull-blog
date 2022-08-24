<template>
  <td>
    <p v-if="!validPost.semanticCluster">Semantic Cluster missing</p>
    <p v-if="!validPost.keywords">keywords missing</p>
    <p v-if="!validPost.review">review missing</p>
    <p v-if="!validPost.backgroundPicture">backgroundPicture missing</p>
    <p v-if="!author(validPost) || author(validPost)=='incomplete'">
      author {{ author(validPost) }}
    </p>
    <p v-if="!validPost.metadescription">metadescription missing</p>
    <p v-if="!validPost.breadcrumb">breadcrumb missing</p>
    <p v-if="!validPost.labels">labels missing</p>
    <p v-if="!validPost.header">header missing</p>
    <p v-if="!validPost.articleContent">articleContent missing</p>
    <p v-if="!validPost.callToAction">callToAction missing</p>
  </td>
</template>

<script>
export default {
  props: ["validPost"],
  methods: {
    author(validPost) {
      if (
        validPost.authorName &&
        validPost.authorRole &&
        validPost.authorAvatar
      ) {
        return true;
      } else if (
        !validPost.authorName &&
        !validPost.authorRole &&
        !validPost.authorAvatar
      ) {
        return false;
      } else {
        return "incomplete";
      }
    }
  }
};
</script>
