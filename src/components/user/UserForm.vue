<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p v-if="user?.id == undefined" class="text-2xl">ユーザ新規追加</p>
        <p v-else class="text-2xl">ユーザ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="user.id" label="ID" type="text" readonly />
            <InputTextField v-model="user.nickname" label="ニックネーム" type="text" />
            <InputTextField v-model="user.profileImageUrl" label="プロフィールイメージ" type="text" />
            <div v-if="user?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostUser" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeleteUser" />
              <Button label="修正" color="green" @click="handlePutUser" />
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
import { useUsersStore } from '~/stores/user'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import Button from '~/components/ui-part/form/Button.vue'

const { userUser, putUser, deleteUser } = useUsersStore()

const user = defineModel<UserType>({ required: true })

async function handlePostUser(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  const newUser = await userUser(user.value)

  navigateTo({
    path: '/users/' + newUser.id,
  })
}

async function handlePutUser(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putUser(user.value)

  navigateTo({
    path: '/users/' + user.value.id,
  })
}

async function handleDeleteUser(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteUser(user.value)

  navigateTo({
    path: '/users',
  })
}
</script>
