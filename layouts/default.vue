<template>
  <Header />
  <div class="container">
    <LeftMenu />
    <slot />
  </div>
</template>

<style lang="postcss">
.container {
  display: flex;
}
</style>
