<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div v-if="post?.id == undefined" class="text-2xl text-center">投稿新規追加</div>
        <div v-else class="text-2xl text-center">投稿詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="post.id" label="ID" type="text" readonly />
            <InputTextField v-model="post.categoryId" label="カテゴリ" type="text" />
            <InputTextField v-model="post.subCategoryId" label="サブカテゴリ" type="text" />
            <InputTextField v-model="post.title" label="タイトル" type="text" />
            <InputTextArea v-model="post.body" label="本文" type="text" />
            <InputTextField v-model="post.user.nickname" label="作成者" type="text" />

            <label class="block">
              <span class="text-gray-700">タグ</span>
              {{ post.tags.map((tag) => tag.id) }}
            </label>
            <label class="block">
              <span class="text-gray-700">お譲り条件</span>
              {{ post.conditions?.map((condition) => condition.id) }}
            </label>

            <InputTextField v-model="post.createdAt" label="作成日時" type="text" />
            <InputTextField v-model="post.updatedAt" label="修正日時" type="text" />
            <div v-if="post?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostPost" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeletePost" />
              <Button label="修正" color="green" @click="handlePutPost" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostType } from '~/types'
import { usePostsStore } from '~/stores/post'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import InputTextArea from '~/components/ui-part/form/InputTextArea.vue'
import Button from '~/components/ui-part/form/Button.vue'
import { useRouter } from 'vue-router'

const { postPost, putPost, deletePost } = usePostsStore()

const post = defineModel<PostType>({ required: true })

const router = useRouter()

async function handlePostPost(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postPost(post.value).then((newPost: PostType) => {
    router.push({ path: '/posts/' + newPost.id })
  })
}

async function handlePutPost(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putPost(post.value)
}

async function handleDeletePost(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deletePost(post.value).then(() => {
    router.push({ path: '/posts' })
  })
}
</script>
