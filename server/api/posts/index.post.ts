export default defineEventHandler(async (event) => {
  const body  = await readBody(event);
  const post = {
      name: body.post.name,
      orderNo: body.post.orderNo,
  }
  const response = await $fetch('https://fa-mate-admin-nuxtjs.onrender.com/admin/posts', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ post }))
  })

  return snakeToCamelCase(response);
});