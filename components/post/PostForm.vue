<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div class="text-2xl text-center" v-if="post.id === undefined">投稿新規追加</div>
        <div class="text-2xl text-center" v-else>投稿詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700">ID</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-gray-100"
                placeholder=""
                v-model="post.id"
                readonly
              />
            </label>
            <label class="block">
              <span class="text-gray-700">カテゴリ</span>
              <div>
                {{ post.categoryId }} > {{ post.subCategoryId }}
              </div>
            </label>
            <label class="block">
              <span class="text-gray-700">タイトル</span>
              <input
                type="email"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="タイトル"
                v-model="post.title"
              />
            </label>
            <label class="block">
              <span class="text-gray-700">本文</span>
              <textarea
                class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                rows="3"
                v-model="post.body"
              ></textarea>
            </label>
            <label class="block">
              <span class="text-gray-700">作成者</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                v-model="post.user.nickname"
              />
            </label>
            <label class="block">
              <span class="text-gray-700">タグ</span>
              {{ post.tags.map((tag) => tag.id) }}
            </label>
            <label class="block">
              <span class="text-gray-700">お譲り条件</span>
              {{ post.conditions?.map((condition) => condition.id) }}
            </label>
            <label class="block">
              <span class="text-gray-700">作成日時</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                v-model="post.createdAt"
              />
            </label>
            <label class="block">
              <span class="text-gray-700">修正日時</span>
              <input
                type="text"
                class="mt-1 block w-full p-1 rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
                v-model="post.updatedAt"
              />
            </label>
            <div class="flex justify-between" v-if="post.id === undefined">
              <div></div>
              <button class="middle none center rounded-lg bg-green-500 py-1 px-3 font-sans text-xs font-bold text-white" @click="handlePostPost">新規追加</button>
            </div>
            <div class="flex justify-between" v-else>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white" @click="handleDeletePost">
                削除
              </button>
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-green-500 text-green-500 hover:bg-green-500 hover:text-white" @click="handlePutPost">
                修正
              </button>
            </div>
            <!--
            <label class="block">
              <span class="text-gray-700">What type of event is it?</span>
              <select
                class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              >
                <option>Corporate event</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Other</option>
              </select>
            </label>
            <label class="block">
              <span class="text-gray-700">Additional details</span>
              <textarea
                class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                rows="3"
              ></textarea>
            </label>
            <div class="block">
              <div class="mt-2">
                <div>
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                    />
                    <span class="ml-2">Email me news and special offers</span>
                  </label>
                </div>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PostType } from '~/types'
  import { usePostsStore } from '~/stores/post';

  const { getPosts, postPost, putPost, deletePost } = usePostsStore()

  const { post } = defineProps<{post: PostType}>();

  async function refreshData() {
    await getPosts()
  }

  async function handlePostPost() {
    if(!confirm('新規追加しますか？')) return

    await postPost(post)
  }

  async function handlePutPost() {
    if(!confirm('修正しますか？' + post.id)) return

    await putPost(post)
    await refreshData()
  }

  async function handleDeletePost() {
    if(!confirm('削除しますか？')) return

    await deletePost(post)
  }
</script>