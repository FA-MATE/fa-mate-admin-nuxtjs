import { defineStore } from 'pinia'
import type { PostType } from '~/types'

export const usePostsStore = defineStore('posts', () => {
  const postsStore = reactive({ posts: [] as PostType[] })

  async function getPosts(queryString: string): Promise<void> {
    const newPosts = (await $fetch('/api/posts?' + queryString)) as PostType[]

    postsStore.posts = newPosts
  }

  async function postPost(post: PostType): Promise<PostType> {
    const newPost = (await $fetch('/api/posts', {
      method: 'POST',
      body: { post },
    })) as PostType

    postsStore.posts = [...postsStore.posts, newPost]

    return newPost
  }

  async function putPost(post: PostType): Promise<void> {
    const newPosts = (await $fetch('/api/posts/' + post.id, {
      method: 'PUT',
      body: { post },
    })) as PostType

    postsStore.posts = [...postsStore.posts.filter((post: PostType) => post.id != newPosts.id), newPosts]
  }

  async function deletePost(post: PostType): Promise<void> {
    const postId = post.id
    await $fetch('/api/posts/' + post.id, {
      method: 'DELETE',
    })

    postsStore.posts = postsStore.posts.filter((post: PostType) => post.id !== postId)
  }

  return { postsStore, getPosts, postPost, putPost, deletePost }
})
