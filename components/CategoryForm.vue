<script>
export default {
  props: ['id'],
};
</script>

<template>
  <div class="form-container">カテゴリID: {{ id }}</div>
</template>

<style lang="postcss">
.form-container {
  background-color: #f7f7f7;
}
</style>
