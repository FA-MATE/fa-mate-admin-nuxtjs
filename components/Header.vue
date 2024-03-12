<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/"><div class="text-white rounded-md px-3 py-2 text-lg font-medium">FA-MATE Admin</div></NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-600 text-white rounded-md px-3 py-4 text-xs font-medium",
                   Default: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-4 text-xs font-medium" -->
              <NuxtLink to="/categories" class="bg-gray-600 text-white rounded-md px-3 py-4 text-xs font-medium" aria-current="page">カテゴリ管理</NuxtLink>
              <NuxtLink to="/conditions" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-4 text-xs font-medium">お譲り条件管理</NuxtLink>
              <NuxtLink to="/tag_groups" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-4 text-xs font-medium">タグ管理</NuxtLink>
              <NuxtLink to="/posts" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-4 text-xs font-medium">投稿管理</NuxtLink>
              <NuxtLink to="/users" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-4 text-xs font-medium">ユーザ管理</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-8">
        <!-- Current: "bg-gray-900 text-white block rounded-md px-3 py-4 text-sm font-medium",
             Default: "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium" -->
        <NuxtLink to="/categories" class="bg-gray-900 text-white block rounded-md px-3 py-4 text-sm font-medium" aria-current="page">カテゴリ管理</NuxtLink>
        <NuxtLink to="/conditions" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium">お譲り条件管理</NuxtLink>
        <NuxtLink to="/tag_groups" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium">タグ管理</NuxtLink>
        <NuxtLink to="/posts" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium">投稿管理</NuxtLink>
        <NuxtLink to="/users" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-4 text-sm font-medium">ユーザ管理</NuxtLink>
      </div>
    </div>
  </nav>
</template>