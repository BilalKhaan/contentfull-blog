<template>
  <div class="validation-table-container">
    <table class="validation-table-main">
      <thead class="validation-errors-header">
        <tr>
          <th>Title</th>
          <th>Slug</th>
          <th>Validation Errors</th>
        </tr>
      </thead>
      <tbody class="validation-errors-body">
        <tr v-for="validPost in validPosts">
          <td>
            <p>{{ validPost.title }}</p>
          </td>
          <td>
            <p>{{ validPost.slug }}</p>
          </td>
          <validationErrors :validPost="validPost" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import validationErrors from "./validationErrors.vue";
export default {
  props: ["validPosts"],
  components: {
    validationErrors
  }
};
</script>

<style lang="scss" scoped>
.validation-table-container {
  margin: 0 auto;
  width: 80%;
  padding: 40px 0;
  .validation-table-main {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    .validation-errors-header {
      background-color: #4a90e2;
      color: #ffff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      th {
        padding: 15px;
        text-align: left;
      }
    }
    .validation-errors-body {
      background-color: #fff;
      color: #000;
      padding: 15px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      th {
        padding: 15px;
        text-align: left;
      }
      p {
        padding: 10px 15px;
      }
    }
  }
  tr:nth-child(even) {
    background-color: #ddd;
  }
}
</style>