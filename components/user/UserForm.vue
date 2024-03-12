<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p class="text-2xl" v-if="user.id === undefined">ユーザ新規追加</p>
        <p class="text-2xl" v-else>ユーザ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="user.id" label="ID" type="text" readonly />
            <InputTextField v-model="user.nickname" label="ニックネーム" type="text" />
            <InputTextField v-model="user.profileImageUrl" label="プロフィールイメージ" type="text" />
            <div class="flex justify-between" v-if="user.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" :onClick="handlePostUser" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" :onClick="handleDeleteUser" />
              <Button label="修正" color="green" :onClick="handlePutUser" />
            </div>
          </div>
          <PostList :posts="user.posts" class="mt-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { UserType } from '~/types'
  import { useUsersStore } from '~/stores/user';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { getUsers, userUser, putUser, deleteUser } = useUsersStore()

  const { user } = defineProps<{user: UserType}>();

  async function handlePostUser() {
    if(!confirm('新規追加しますか？')) return

    const newUser = await userUser(user)

    navigateTo({
      path: '/users/' + newUser.id
    });
  }

  async function handlePutUser() {
    if(!confirm('修正しますか？')) return
    
    await putUser(user)

    navigateTo({
      path: '/users/' + user.id
    });
  }

  async function handleDeleteUser() {
    if(!confirm('削除しますか？')) return

    await deleteUser(user)

    navigateTo({
      path: '/users'
    });
  }
</script>