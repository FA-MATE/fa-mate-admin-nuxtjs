import { defineStore } from 'pinia'
import type { PostType } from '~/types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<PostType[]>([])

  async function getPosts(queryString: string): Promise<void> {
    const newPosts = (await $fetch('/api/posts?' + queryString)) as PostType[]

    posts.value = newPosts
  }

  async function postPost(post: PostType): Promise<PostType> {
    const newPost = (await $fetch('/api/posts', {
      method: 'POST',
      body: { post },
    })) as PostType

    posts.value = [...posts.value, newPost]

    return newPost
  }

  async function putPost(post: PostType): Promise<void> {
    const newPosts = (await $fetch('/api/posts/' + post.id, {
      method: 'PUT',
      body: { post },
    })) as PostType

    posts.value = [...posts.value.filter((post: PostType) => post.id != newPosts.id), newPosts]
  }

  async function deletePost(post: PostType): Promise<void> {
    const postId = post.id
    await $fetch('/api/posts/' + post.id, {
      method: 'DELETE',
    })

    posts.value = posts.value.filter((post: PostType) => post.id !== postId)
  }

  return { posts, getPosts, postPost, putPost, deletePost }
})
