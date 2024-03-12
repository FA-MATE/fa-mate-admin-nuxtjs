<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div class="text-2xl text-center" v-if="post.id === undefined">投稿新規追加</div>
        <div class="text-2xl text-center" v-else>投稿詳細</div>
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
            <div class="flex justify-between" v-if="post.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" :onClick="handlePostPost" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" :onClick="handleDeletePost" />
              <Button label="修正" color="green" :onClick="handlePutPost" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PostType } from '~/types'
  import { usePostsStore } from '~/stores/post';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import InputTextArea from '~/components/ui-part/form/InputTextArea'
  import Button from '~/components/ui-part/form/Button'

  const { postPost, putPost, deletePost } = usePostsStore()

  const { post } = defineProps<{post: PostType}>();

  async function handlePostPost() {
    if(!confirm('新規追加しますか？')) return

    await postPost(post)
  }

  async function handlePutPost() {
    if(!confirm('修正しますか？')) return

    await putPost(post)
  }

  async function handleDeletePost() {
    if(!confirm('削除しますか？')) return

    await deletePost(post)
  }
</script>