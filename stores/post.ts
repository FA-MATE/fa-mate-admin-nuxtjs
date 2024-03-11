import { ref } from 'vue'
import { defineStore } from "pinia";
import type { PostType } from "~/types";

export const usePostsStore = defineStore('posts', () => {
  const postsStore = reactive({ posts: [] as PostType[] })

  async function getPosts(queryString: string) {
    const newPosts = (await $fetch('/api/posts?' + queryString)) as PostType[];

    postsStore.posts = newPosts;
  }

  async function postPost(post: PostType) {
    const newPost = await $fetch('/api/posts',
      { 
        method: 'POST',
        body: { post },
      }
    ) as PostType;

    postsStore.posts = [...postsStore.posts, newPost];

    return newPost
  }

  async function putPost(post: PostType) {
    const newPosts = await $fetch('/api/posts/' + post.id,
      { 
        method: 'PUT',
        body: { post },
      }
    ) as PostType;

    postsStore.posts = [...postsStore.posts.filter((post: PostType) => post.id != newPosts.id), newPosts];
  }

  async function deletePost(post: PostType) {
    const postId = post.id
    const newPosts = await $fetch('/api/posts/' + post.id,
      { 
        method: 'DELETE',
      }
    ) as PostType;

    postsStore.posts = postsStore.posts.filter((post: PostType) => post.id !== postId);
  }

  return { postsStore, getPosts, postPost, putPost, deletePost }
});
