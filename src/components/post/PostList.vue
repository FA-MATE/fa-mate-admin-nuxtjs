<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">投稿一覧</div>
        <div>
          <NuxtLink to="/posts/new">
            <Button label="新規登録" color="green" />
          </NuxtLink>
        </div>
      </div>
      <slot />
    </caption>
    <thead class="bg-white border-b">
      <tr>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          ID
        </th>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          タイトル
        </th>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          カテゴリ
        </th>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          ユーザ
        </th>
        <td
          class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600"
          colspan="2"
        ></td>
      </tr>
    </thead>
    <tbody>
      <PostListNode v-for="post in posts" :key="post.id" :post="post" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { PostType } from '~/types'
import Button from '~/components/ui-part/form/Button.vue'

defineProps<{ posts: PostType[] }>()
</script>
