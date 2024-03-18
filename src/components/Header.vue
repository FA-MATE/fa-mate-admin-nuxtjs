<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/"
              ><div class="text-white rounded-md px-3 py-2 text-lg font-medium">FA-MATE Admin</div></NuxtLink
            >
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink to="/categories" :class="classObject('categories')" aria-current="page">カテゴリ管理</NuxtLink>
              <NuxtLink to="/tag_groups" :class="classObject('tag_groups')">タグ管理</NuxtLink>
              <NuxtLink to="/condition_groups" :class="classObject('condition_groups')">お譲り条件管理</NuxtLink>
              <NuxtLink to="/posts" :class="classObject('posts')">投稿管理</NuxtLink>
              <NuxtLink to="/users" :class="classObject('users')">ユーザ管理</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-8">
        <NuxtLink to="/categories" :class="classObject('categories')" aria-current="page">カテゴリ管理</NuxtLink>
        <NuxtLink to="/tag_groups" :class="classObject('tag_groups')">タグ管理</NuxtLink>
        <NuxtLink to="/condition_groups" :class="classObject('condition_groups')">お譲り条件管理</NuxtLink>
        <NuxtLink to="/posts" :class="classObject('posts')">投稿管理</NuxtLink>
        <NuxtLink to="/users" :class="classObject('users')">ユーザ管理</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

function classObject(routeName: string): string {
  return route.name == routeName
    ? 'bg-gray-900 text-white block rounded-md px-3 py-4 text-sm font-medium'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium'
}
</script>
