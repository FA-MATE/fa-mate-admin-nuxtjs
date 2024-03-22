<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div v-if="post?.id == undefined" class="text-2xl text-center">投稿新規追加</div>
        <div v-else class="text-2xl text-center">投稿詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="post.id" label="ID" type="text" readonly />
            <CategoryFinderComponent v-model="post.categoryId" class="z-50" label="カテゴリ" />
            <SubCategoryFinderComponent v-model="post.subCategoryId" class="z-40" label="サブカテゴリ" />
            <InputTextField v-model="post.title" label="タイトル" type="text" />
            <InputTextArea v-model="post.body" label="本文" type="text" />
            <TagFinderComponent v-model="post.tagIds" class="z-30" label="タグ" />
            <ConditionFinderComponent v-model="post.conditionIds" class="z-20" label="お譲り条件" />
            <UserFinderComponent v-model="post.userId" class="z-10" label="作成者" />
            <InputTextField v-model="post.createdAt" label="作成日時" type="text" readonly />
            <InputTextField v-model="post.updatedAt" label="修正日時" type="text" readonly />
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
import { useSelectableTextInput } from '~/composable/useSelectableTextInput'
import { useCategoriesStore } from '~/stores/category'
import { useConditionsStore } from '~/stores/condition'
import { useTagsStore } from '~/stores/tag'
import { useUsersStore } from '~/stores/user'

const { postPost, putPost, deletePost } = usePostsStore()

const postModel = defineModel<PostType>({
  required: true,
  default: {
    title: '',
    body: '',
    categoryId: 0,
    subCategoryId: 0,
    user: {
      nickname: 'test',
      profileImageUrl: '',
      conditions: [],
      posts: [],
    },
    tags: [],
    conditions: [],
    postImages: [],
    createdAt: '',
    updatedAt: '',
  },
})
const post = reactive(postModel)

// カテゴリ
const { categories, subCategories } = useCategoriesStore()
const CategoryFinderComponent = useSelectableTextInput(categories, 'name')

// サブカテゴリ
const SubCategoryFinderComponent = useSelectableTextInput(subCategories, 'name')

// タグ
const { tags } = useTagsStore()
const TagFinderComponent = useSelectableTextInput(tags, 'name', { uniqueColumn: 'tagGroupId' })

// お譲り条件
const { conditions } = useConditionsStore()
const ConditionFinderComponent = useSelectableTextInput(conditions, 'name', { uniqueColumn: 'conditionGroupId' })

// ユーザ
const { users } = useUsersStore()
const UserFinderComponent = useSelectableTextInput(users, 'nickname')

// 画像

async function handlePostPost(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postPost(post.value).then((newPost: PostType) => {
    navigateTo({ path: '/posts/' + newPost.id })
  })
}

async function handlePutPost(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putPost(post.value)
}

async function handleDeletePost(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deletePost(post.value).then(() => {
    navigateTo({ path: '/posts' })
  })
}
</script>
