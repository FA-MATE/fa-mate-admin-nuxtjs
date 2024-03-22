import { defineStore } from 'pinia'
import type { ConditionType, PostFormType, PostType, TagType } from '~/types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<PostType[]>([])

  async function getPosts(queryString: string): Promise<void> {
    const newPosts = (await $fetch('/api/posts?' + queryString)) as PostType[]

    posts.value = newPosts.map((post) => {
      return decoratePost(post)
    })
  }

  async function getPost(id: number): Promise<PostType> {
    const newPost = decoratePost((await $fetch(`/api/posts/${id}`)) as PostType)

    posts.value = posts.value.map((post) => {
      if (post.id === newPost.id) return newPost
      else return post
    })

    return newPost
  }

  async function postPost(post: PostType): Promise<PostType> {
    const { title, body, categoryId, subCategoryId } = post

    const params: PostFormType = {
      title,
      body,
      categoryId,
      subCategoryId,
      //userId: userId as number,
      postTagsAttributes: (post.tagIds || [])?.map((tagId) => {
        return {
          tagId,
        }
      }),
      postConditionsAttributes: post.conditionIds?.map((conditionId) => {
        return {
          conditionId,
        }
      }),
    }

    const newPost = (await $fetch('/api/posts', {
      method: 'POST',
      body: params,
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

  function decoratePost(post: PostType): PostType {
    return {
      ...post,
      tagIds: post.tags.map((tag: TagType) => tag.id?.toString()),
      conditionIds: post.conditions.map((condition: ConditionType) => condition.id?.toString()),
      userId: post.user.id,
    } as PostType
  }

  return { posts, getPosts, getPost, postPost, putPost, deletePost }
})
