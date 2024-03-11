import { snakeToCamelCase, mapToQueryString } from '~/utils/'

export default defineEventHandler(async (event) => {
  console.log('event ' , event)
  const query = getQuery(event)
  
  return snakeToCamelCase(await $fetch('https://fa-mate-admin-nuxtjs.onrender.com/admin/posts?' + mapToQueryString(query)))
})