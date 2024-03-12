<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">ユーザ一覧</div>
        <div>
          <NuxtLink :to="'/users/new'">
            <Button label="新規追加" color="green" />
          </NuxtLink>
        </div>
      </div>
    </caption>
    <thead class="bg-white border-b">
      <tr>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ID</th>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ユーザ名</th>
        <td class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600" colspan="2"></td>
      </tr>
    </thead>
    <tbody>
      <UserListNode v-for="user in users" :user="user" :key="user.id" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { UserType } from "~/types";;
  import Button from '~/components/ui-part/form/Button'

  defineProps<{users: UserType[]}>()
</script>